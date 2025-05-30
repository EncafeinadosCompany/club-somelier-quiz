const express = require('express');
const CategoryController = require('../controllers/category.controller');
const { validateCategory } = require('../middlewares/category.middleware');

const router = express.Router();
const categoryController = new CategoryController();

router
    .get('/', categoryController.getAllCategorys)
    .get('/:id', categoryController.getCategoryById)
    .post('/', validateCategory, categoryController.createCategory)
    .put('/:id', categoryController.updateCategory)
    .delete('/:id', categoryController.deleteCategory)

module.exports = router;
