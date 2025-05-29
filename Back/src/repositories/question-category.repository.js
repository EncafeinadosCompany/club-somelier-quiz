const { QuestionCategory } = require('../models/question-category.model');

class QuestionCategoryRepository {

    async create(data) {
        return await QuestionCategory.create(data);
    }

    async findAll() {
        return await QuestionCategory.findAll();
    }

    async findById(id) {
        return await QuestionCategory.findByPk(id);
    }

}

module.exports = QuestionCategoryRepository;