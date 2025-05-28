const express = require('express');
const CategoryController = require('../controllers/category.controller');

const router = express.Router();
const categoryController = new CategoryController();

router
    .get('/', categoryController.getAllCategorys)
    .get('/:id', categoryController.getCategoryById)
    .post('/', categoryController.createCategory)
    .put('/:id', categoryController.updateCategory)
    .delete('/:id', categoryController.deleteCategory)

module.exports = router;
