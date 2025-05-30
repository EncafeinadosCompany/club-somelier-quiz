const express = require('express');
const LevelController = require('../controllers/level.controller');

const router = express.Router();
const levelController = new LevelController();

router
    .get('/', levelController.getLevels)
    .get('/:id', levelController.getLevelById)
    .post('/', levelController.createLevel)

module.exports = router;
