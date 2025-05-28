const { sequelize } = require('../config/connection');
const QuestionnaireRepository = require('../repositories/questionnaire.repository');
const QuestionnaireQuestionRepository = require('../repositories/questionnaire-question.repository');

class QuestionnairesService {
     constructor() {
        this.questionnaireRepository = new QuestionnaireRepository();
        this.questionnaireQuestionRepository = new QuestionnaireQuestionRepository();
    }

    async createQuestionnaire(data) {
        const t = await sequelize.transaction();

        try {
            const questionnaire = await this.questionnaireRepository.create({
                title: data.title
            }, t);

            const questionnaireQuestions = data.questions.map((questionId) => ({
                questionnaire_id: questionnaire.id,
                question_id: questionId,
            }));

            await this.questionnaireQuestionRepository.createMany(questionnaireQuestions, t);

            await t.commit();
            return questionnaire;

        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async findById(id) {
        return await this.questionnairesRepository.findById(id);
    }
    async findAll() {
        return await this.questionnairesRepository.findAll();
    }
    async update(id, data) {
        return await this.questionnairesRepository.update(id, data);
    }

}

module.exports = QuestionnairesService;