const express = require('express');
const router = express.Router();

const ParticipantContoller = require('../controllers/participants.controller');
const { validatParticipant } = require('../middlewares/participant.middleware');
const { authenticateJWT } = require('../middlewares/auth.middleware');

const participantController = new ParticipantContoller();

router
    .get('/', authenticateJWT, participantController.getAllParticipant)
    .get('/:id', authenticateJWT, participantController.getParticipantById)
    .post('/:accessCode', validatParticipant, participantController.createParticipant)

module.exports = router;
