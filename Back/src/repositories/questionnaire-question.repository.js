const { QuestionnaireQuestion } = require('../models/questionnaire-question.model');

class QuestionnaireQuestionRepository {
    async createMany(questionnaireQuestions, transaction) {
        return await QuestionnaireQuestion.bulkCreate(questionnaireQuestions, {
            transaction
        });
    }

}

module.exports = QuestionnaireQuestionRepository;