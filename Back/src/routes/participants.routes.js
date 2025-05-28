const express = require('express');
const UserController = require('../controllers/participants.controller');

const router = express.Router();
const userController = new UserController();

router
    .get('/', userController.getAllUsers)
    .get('/:id', userController.getUserById)
    .post('/', userController.createUser)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser)

module.exports = router;
