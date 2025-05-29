const QuestionRepository = require("../repositories/question.repository");

class QuestionService {
    constructor() {
        this.questionRepository = new QuestionRepository();
    }

    async createQuestion(data) {
        return await this.questionRepository.create(data);
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