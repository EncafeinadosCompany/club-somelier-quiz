const { Question } = require('../models/question.model');
const { Level } = require('../models/level.model');
const { Admin } = require('../models/admin.model');

class QuestionRepository {
    async create(data, transaction) {
        return await Question.create(data, { transaction });
    }

    async findAll() {
        return await Question.findAll({
            include: [
                {
                    model: Level
                },
                {
                    model: Admin
                }
            ]
        });
    }

    async findById(id) {
        return await Question.findByPk(id, {
            include: [
                {
                    model: Level,
                   
                },
                {
                    model: Admin,
                }
            ]
        });
    }

    async findByLevelId(levelId) {
        return await Question.findAll({
            where: { level_id: levelId }
        });
    }

    async update(id, data, transaction) {
        return await Question.update(data, {
            where: { id },
            transaction
        });
    }
}

module.exports = QuestionRepository;