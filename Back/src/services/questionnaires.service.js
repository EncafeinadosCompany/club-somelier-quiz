const { sequelize } = require('../config/connection');

const CategoryRepository = require("../repositories/category.repository");
const QuestionnaireRepository = require('../repositories/questionnaire.repository');
const QuestionnaireQuestionRepository = require('../repositories/questionnaire-question.repository');
const QuestionnaireCategoryRepository = require('../repositories/questionnaire-category.repository');

class QuestionnairesService {
    constructor() {
        this.questionnaireRepository = new QuestionnaireRepository();
        this.categoryRepository = new CategoryRepository();
        this.questionnaireCategoryRepository = new QuestionnaireCategoryRepository()
        this.questionnaireQuestionRepository = new QuestionnaireQuestionRepository();
    }

    async createQuestionnaire(data) {
        const t = await sequelize.transaction();

        try {
            const questionnaire = await this.questionnaireRepository.create({
                title: data.title,
                description: data.description || '',
            }, t);

            for (const categoryId of data.categories) {
                const category = await this.categoryRepository.getById(categoryId);
                if (!category) {
                    console.warn(`Category with ID ${categoryId} does not exist. Skipping...`);
                    continue;
                }

                await this.questionnaireCategoryRepository.create({
                    questionnaire_id: questionnaire.id,
                    category_id: categoryId
                });
            }

            const questionnaireQuestions = data.questions.map((questionId, index) => ({
                questionnaire_id: questionnaire.id,
                question_id: questionId,
                position: index + 1
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
        return await this.questionnaireRepository.findById(id);
    }

    async findAll() {
        return await this.questionnaireRepository.findAll();
    }

    async update(id, data) {
        return await this.questionnaireRepository.update(id, data);
    }

}

module.exports = QuestionnairesService;