const express = require('express');
const QuestionController = require('../controllers/question.controller');

const router = express.Router();

const questionController = new QuestionController();

router
    .get('/', questionController.getQuestions)
    .get('/:id', questionController.getQuestionById)
    .get('/level/:levelId', questionController.getQuestionsByLevelId)
    .post('/', questionController.createQuestion)


module.exports = router;