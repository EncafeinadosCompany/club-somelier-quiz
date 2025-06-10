const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const { validateLogin } = require('../middlewares/login.middleware');

const authController = new AuthController();

router
    .post('/login', validateLogin, authController.login)

module.exports = router;