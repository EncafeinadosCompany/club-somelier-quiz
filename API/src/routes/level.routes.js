const express = require('express');
const router = express.Router();

const LevelController = require('../controllers/level.controller');

const levelController = new LevelController();
const { authenticateJWT } = require('../middlewares/auth.middleware')

router
    .get('/', authenticateJWT, levelController.getLevels)
    .get('/:id', authenticateJWT, levelController.getLevelById)
    .post('/', authenticateJWT, levelController.createLevel)

module.exports = router;
