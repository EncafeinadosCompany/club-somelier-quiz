
const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');
const { validateAdmin } = require('../middlewares/admin.middleware');
const { authenticateJWT } = require('../middlewares/auth.middleware')

const adminController = new AdminController();

router
    .get('/:id', authenticateJWT, adminController.getAdminById)
// .post('/', validateAdmin, adminController.createAdmin)

module.exports = router;