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
        const live = this.liveEvents.getOrFail(accessCode);

        const existingAnswer = await this.#checkExistingAnswer(live.eventId, questionId, participantId);
        if (existingAnswer) return existingAnswer;

        const { question, level } = await this.#getLiveQuestionAndLevel(live, questionId);

        const is_correct = answer === question.response;

        const seconds = this.#calculateSeconds(live.questionStart);
        const score = this.#calculateScore(is_correct, level, seconds);

        await this.answerRepo.create({
            event_id: live.eventId,
            question_id: questionId,
            participant_id: participantId,
            response: answer,
            is_correct,
            response_time: seconds,
            points_awarded: score,
        });

        return { is_correct, score };
    }

    async #checkExistingAnswer(eventId, questionId, participantId) {
        const existingAnswer = await this.answerRepo.findBy({
            event_id: eventId,
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
        return null;
    }

    async #getLiveQuestionAndLevel(live, questionId) {
        const question = live.questions.find((q) => q.id === questionId);
        if (!question) throw new Error("Question not found in live session");

        const level = await this.levelRepo.findById(question.level_id);
        return { question, level };
    }

    #calculateSeconds(questionStart) {
        if (!questionStart) throw new Error("Question start time is not set");

        const elapsedMs = Date.now() - questionStart;
        return elapsedMs / 1000;
    }

    #calculateScore(isCorrect, level, elapsedSeconds) {
        if (!isCorrect) return 0;
        const score = Math.max(level.points - 1 * elapsedSeconds, 0);
        return Math.round(score);
    }

}

module.exports = AnswerService;
