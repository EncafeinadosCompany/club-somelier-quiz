const { QuestionnaireQuestion } = require('../models/questionnaire-question.model');

class QuestionnaireQuestionRepository {
    async createMany(questionnaireQuestions, transaction) {
        return await QuestionnaireQuestion.bulkCreate(questionnaireQuestions, {
            transaction
        });
    }

    async deleteByQuestionnaireandQuestion(questionnaireId, questionId) {
        return await QuestionnaireQuestion.destroy({
            where: {
                questionnaire_id: questionnaireId,
                question_id: questionId
            },
        });
    }

    async findByQuestionnaireId(questionnaireId) {
    return await QuestionnaireQuestion.findAll({
      where: {
        questionnaire_id: questionnaireId,
      },
    });
  }

}

module.exports = QuestionnaireQuestionRepository;