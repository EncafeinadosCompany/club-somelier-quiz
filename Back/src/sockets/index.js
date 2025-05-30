const { liveEvents } = require('./liveEvents');
const { Participant, Answer, Level } = require('../models');
const { sequelize } = require('../config/connection');
const EventService = require('../services/event.service');
const QuestionnairesService = require('../services/questionnaires.service');

const eventService = new EventService();
const questionnaireService = new QuestionnairesService();

function initializeWebSockets(io) {
    io.on('connection', (socket) => {
        console.log('🔌 Conectado:', socket.id);

        /* ========== JOIN EVENT (Participants) ========== */
        socket.on('join_event', async ({ accessCode, participantId }) => {
            socket.join(accessCode);
            socket.data = { accessCode, participantId };
            console.log(`${socket.id} joined ${accessCode}`);
            socket.emit('joined_ok');
        });

        /* ========== JOIN EVENT (Admin) ========== */
        socket.on('admin:join', async ({ accessCode }) => {
            socket.join(accessCode);
            socket.data = { accessCode, role: 'admin' };
            console.log(`👑 Admin ${socket.id} joined ${accessCode}`);
            socket.emit('admin:joined_ok');
        });

        /* ========== ADMIN: START EVENT ========== */
        socket.on('admin:start_event', async ({ accessCode }) => {
            const event = await eventService.getEventByCode(accessCode);

            console.log('acceso al evento:', event.questionnaire_id);
            // 1) obtener lista ordenada de preguntas
            const qn = await questionnaireService.findById(event.questionnaire_id);
            const questions = qn.questions
                .sort(
                    (a, b) =>
                        a.questionnaire_questions.position -
                        b.questionnaire_questions.position
                )
                .map((q) => q)
            liveEvents.set(accessCode, {
                eventId: event.id,
                questions,
                currentIdx: -1,          
                questionStart: null
            });

            io.to(accessCode).emit('event_started');
        });

        /* ========== ADMIN: NEXT QUESTION ========== */
        socket.on('admin:next_question', ({ accessCode }) => {
            const live = liveEvents.get(accessCode);
            if (!live) return socket.emit('error', 'No live session');

            live.currentIdx += 1;
            if (live.currentIdx >= live.questions.length) {
                io.to(accessCode).emit('no_more_questions');
                return;
            }

            live.questionStart = Date.now();
            const q = live.questions[live.currentIdx];

            io.to(accessCode).emit('show_question', {
                questionId: q.id,
                position: live.currentIdx + 1,
                total: live.questions.length,
                text: q.question,
                // …opciones si tuvieras
            });
        });

        /* ========== PARTICIPANTE: SUBMIT ANSWER ========== */
        socket.on('submit_answer', async ({ questionId, answer }) => {
            const { accessCode, participantId } = socket.data;
            const live = liveEvents.get(accessCode);
            if (!live) return;

            const elapsedMs = Date.now() - live.questionStart;
            const question = live.questions[live.currentIdx];

            const is_correct = (answer === question.response);
            const basePts = await Level.findByPk(question.level_id).then(l => l.points);
            const k = 1;                                // tu constante
            const seconds = elapsedMs / 1000;
            const score = is_correct ? Math.max(basePts - k * seconds, 0) : 0;

            await Answer.create({
                event_id: live.eventId,
                question_id: questionId,
                participant_id: participantId,
                response: answer,
                is_correct,
                response_time: seconds,
                points_awarded: score
            });

            socket.emit('answer_ack', { is_correct, score });
        });

        /* ========== ADMIN: END EVENT ========== */
        socket.on('admin:end_event', async ({ accessCode }) => {
            const live = liveEvents.get(accessCode);
            if (!live) return;

            // calcular ranking final
            const scores = await Answer.findAll({
                where: { event_id: live.eventId },
                attributes: [
                    'participant_id',
                    [sequelize.fn('SUM', sequelize.col('points_awarded')), 'total']
                ],
                group: ['participant_id'],
                order: [[sequelize.literal('total'), 'DESC']],
                include: [{ model: Participant, attributes: ['fullName'] }]
            });

            io.to(accessCode).emit('event_results', scores);
            liveEvents.delete(accessCode);
        });

        socket.on('disconnect', () => {
            console.log('❌  Desconectado:', socket.id);
        });
    });
}

module.exports = { initializeWebSockets };