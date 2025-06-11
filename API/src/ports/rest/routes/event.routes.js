const express = require('express');
const router = express.Router();

const EventController = require('../controllers/event.controller');
const { authenticateJWT } = require('../../../middlewares/auth.middleware');

const eventController = new EventController();

router
    .get('/', authenticateJWT, eventController.getAllEvents)
    .get('/:id', authenticateJWT, eventController.getEventById)
    .get('/status/:status', eventController.getAllEventsByStatus)
    .get('/code/:code', eventController.getEventByCode)
    .post('/', authenticateJWT, eventController.createEvent)
    .put('/:id', authenticateJWT, eventController.updateEvent)
    .delete('/:id', authenticateJWT, eventController.deleteEvent)

module.exports = router;
