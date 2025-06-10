const AnswerRepo = require('../repositories/answer.repository');
const LevelRepo = require('../repositories/level.repository');
const LiveEventService = require('./live-event.service');

class AnswerService {
    constructor() {
        this.answerRepo = new AnswerRepo();
        this.levelRepo = new LevelRepo();
        this.liveEvents = LiveEventService;
    }

    async submitAnswer({ accessCode, participantId, questionId, answer }) {
        const live = this.liveEvents.get(accessCode);
        if (!live) throw new Error("No active session");

        const existingAnswer = await this.answerRepo.findBy({
            event_id: live.eventId,
            question_id: questionId,
            participant_id: participantId,
        });

        if (existingAnswer) {
            return {
                is_correct: existingAnswer.is_correct,
                score: existingAnswer.points_awarded,
                duplicate: true,
            };
        }

        const question = live.questions.find((q) => q.id === questionId);
        if (!question) throw new Error("Question not found in live session");

        if (!live.questionStart) throw new Error("Question start time not set");

        const is_correct = answer === question.response;
        const level = await this.levelRepo.findById(question.level_id);
        const basePts = level.points
        
        const elapsedMs = Date.now() - live.questionStart;
        const seconds = elapsedMs / 1000;
        const score = is_correct ? Math.max(basePts - 1 * seconds, 0) : 0;

        const roundedScore = Math.round(score);

        await this.answerRepo.create({
            event_id: live.eventId,
            question_id: questionId,
            participant_id: participantId,
            response: answer,
            is_correct,
            response_time: seconds,
            points_awarded: roundedScore,
        });

        return { is_correct, score: roundedScore };
    }

}

module.exports = AnswerService;
