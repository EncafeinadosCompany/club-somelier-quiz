const { Level } = require('../models/level.model');
const { Question } = require('../models/question.model');

class LevelRepository {
    async create(data, transaction) {
        return await Level.create(data, { transaction });
    }

    async findAll() {
        return await Level.findAll({
            include: [{
                model: Question,
              
            }]
        });
    }

    async findById(id) {
        return await Level.findByPk(id, {
            include: [{
                model: Question,
               
            }]
        });
    }

}

module.exports = LevelRepository;