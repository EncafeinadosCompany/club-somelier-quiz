const questionnaireService = require('../services/questionnaires.service')

class QuestionnaireController{
    controller(){
        tthis.questionnaireService = new questionnaireService();
    }
   async getAllQuestionnaires (req, res)  {
        try {
            const questionnaires = await this.questionnaireService.findAll();
            res.json(questionnaires);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
   async getQuestionnaireById (req, res) {
        try {
            const questionnaire = await this.questionnaireService.findById(req.params.id);
            if (!questionnaire) return res.status(404).json({ error: 'Questionnaire not found' });
            res.json(questionnaire);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
   async createQuestionnaire(req, res) {
        try {
            const questionnaire = await this.questionnaireService.createQuestionnaire(req.body);
            res.status(201).json({
                success: true,
                data: questionnaire
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating questionnaire',
                error: error.message
            });
        }
    }
    async updateQuestionnaire (req, res) {
        try {
            const updatedQuestionnaire = await this.questionnaireService.update(req.params.id, req.body);
            if (!updatedQuestionnaire) return res.status(404).json({ error: 'Questionnaire not found' });
            res.json(updatedQuestionnaire);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = QuestionnaireController;