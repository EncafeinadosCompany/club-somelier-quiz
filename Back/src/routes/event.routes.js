const express = require('express');
const EventController = require('../controllers/event.controller');
const { authenticateJWT } = require('../middlewares/auth.middleware');

const router = express.Router();
const eventController = new EventController();

router
    .get('/', eventController.getAllEvents)
    .get('/:code', eventController.getEventByCode)
    .post('/', eventController.createEvent)
    .put('/:id', eventController.updateEvent)
    .delete('/:id', eventController.deleteEvent)

module.exports = router;
