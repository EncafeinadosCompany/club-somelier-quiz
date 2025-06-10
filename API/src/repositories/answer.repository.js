const { Participant, Answer } = require('../models');
const { sequelize } = require('../config/connection')

class AnswerRepository {
    async getAll() {
        return await Answer.findAll();
    }

    async create(data) {
        return await Answer.create(data);
    }

    async findBy(conditions) {
        return await Answer.findOne({
            where: conditions
        });
    }

    async getScoresByEvent(eventId) {
        return await Answer.findAll({
            where: { event_id: eventId },
            include: [
                {
                    model: Participant,
                    attributes: ["id", "fullName"],
                },
            ],
            attributes: [
                'participant_id',
                [sequelize.fn('SUM', sequelize.col('points_awarded')), 'total']
            ],
            group: [
                "answers.participant_id",
                "participant.id",
                "participant.fullName",
            ],
            order: [[sequelize.literal('total'), 'DESC']]
        });
    }
}

module.exports = AnswerRepository;
