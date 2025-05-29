const {QuestionnaireDTO, ListQuestionnaireDTO} = require("../dtos/questionnaire.dto");
const QuestionnaireService = require("../services/questionnaires.service");

class QuestionnaireController {
    constructor() {
        this.questionnaireService = new QuestionnaireService();
    }

    getAllQuestionnaires = async (req, res) => {
        try {
            const questionnaires = await this.questionnaireService.findAll();
            res.json(questionnaires);
        } catch (error) {
            
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

   getQuestionnaireById = async (req, res) => {
        try {
            const questionnaire = await this.questionnaireService.findById(req.params.id);
            
            if (!questionnaire) {
                return res.status(404).json({
                    message: 'Questionnaire not found'
                });
            }

            const formattedQuestionnaire = new QuestionnaireDTO(questionnaire);
            
            return res.status(200).json(formattedQuestionnaire);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error retrieving questionnaire',
                error: error.message
            });
        }
    };

    createQuestionnaire = async (req, res) => {
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

    updateQuestionnaire = async (req, res) => {
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