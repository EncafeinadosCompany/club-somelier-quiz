const CategoryRepository = require('../repositories/category.repository');

class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async getAllCategorys() {
    return await this.categoryRepository.getAll();
  }

  async getCategoryById(id) {
    return await this.categoryRepository.getById(id);
  }

  async createCategory(data) {

    return await this.categoryRepository.create(data);
  }

  async updateCategory(id, data) {
    return await this.categoryRepository.update(id, data);
  }

  async deleteCategory(id) {
    return await this.categoryRepository.delete(id);
  }
}

module.exports = CategoryService;
