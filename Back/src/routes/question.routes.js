const express = require('express');
const QuestionController = require('../controllers/question.controller');
const { validateQuestion } = require('../middlewares/questions.middleware');

const router = express.Router();

const questionController = new QuestionController();

router
    .get('/', questionController.getQuestions)
    .get('/:id', questionController.getQuestionById)
    .get('/level/:levelId', questionController.getQuestionsByLevelId)
    .post('/', validateQuestion, questionController.createQuestion)

module.exports = router;