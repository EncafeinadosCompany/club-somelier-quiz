const { Router } = require('express');
const QuestionnaireController = require('../controllers/questionnaire.controller');

const { validateQuestionnaire } = require('../middlewares/questionnaire.middleware');
const questionnaireController = new QuestionnaireController();
const router = Router();

router
    .get('/', questionnaireController.getAllQuestionnaires)
    .get('/:id', questionnaireController.getQuestionnaireById)
    .post('/', validateQuestionnaire, questionnaireController.createQuestionnaire)
    .put('/:id', questionnaireController.updateQuestionnaire)

module.exports = router;