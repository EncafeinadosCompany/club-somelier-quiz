const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/category.controller');
const { validateCategory } = require('../../../middlewares/category.middleware');
const { authenticateJWT } = require('../../../middlewares/auth.middleware')

const categoryController = new CategoryController();

router
    .get('/', authenticateJWT, categoryController.getAllCategorys)
    .get('/:id', authenticateJWT, categoryController.getCategoryById)
    .post('/', authenticateJWT, validateCategory, categoryController.createCategory)
    .put('/:id', authenticateJWT, categoryController.updateCategory)
    .delete('/:id', authenticateJWT, categoryController.deleteCategory)

module.exports = router;
