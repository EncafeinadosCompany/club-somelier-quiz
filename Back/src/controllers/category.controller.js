const CategoryService = require('../services/category.service');

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
  }

  getAllCategorys = async (req, res) => {
    const categorys = await this.categoryService.getAllCategorys();
    res.json(categorys);
  }

  getCategoryById = async (req, res) => {
    const category = await this.categoryService.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  }

  createCategory = async (req, res) => {
    const category = await this.categoryService.createCategory(req.body);
    res.status(201).json(category);
  }

  updateCategory = async (req, res) => {
    await this.categoryService.updateCategory(req.params.id, req.body);
    res.sendStatus(204);
  }

  deleteCategory = async (req, res) => {
    await this.categoryService.deleteCategory(req.params.id);
    res.sendStatus(204);
  }
}

module.exports = CategoryController;
