const CategoryRepository = require("../repositories/category.repository");
const QuestionCategoryRepository = require("../repositories/question-category.repository");
const QuestionRepository = require("../repositories/question.repository");

class QuestionService {
    constructor() {
        this.questionRepository = new QuestionRepository();
        this.categoryRepository = new CategoryRepository();
        this.questionCategoryRepository = new QuestionCategoryRepository()
    }

    async createQuestion(data) {
        const question = await this.questionRepository.create({
            question: data.question,
            response: data.response,
            level_id: data.level_id
        });

        const failedCategories = [];

        for (const categoryId of data.categories) {
            const category = await this.categoryRepository.getById(categoryId);
            if (!category) {
                failedCategories.push(categoryId);
                continue;
            }

            await this.questionCategoryRepository.create({
                question_id: question.id,
                category_id: categoryId
            });
        }

        return {
            message: failedCategories.length
                ? `Pregunta creada. Algunas categorías no fueron asignadas porque no existen: ${failedCategories.join(", ")}`
                : 'Pregunta creada exitosamente con todas las categorías.',
            question
        };
    }


    async getQuestions() {
        console.log("Fetching all questions");
        return await this.questionRepository.findAll();
    }

    async getQuestionById(id) {
        return await this.questionRepository.findById(id);
    }

    async getQuestionsByLevelId(levelId) {
        return await this.questionRepository.findByLevelId(levelId);
    }
}

module.exports = QuestionService;