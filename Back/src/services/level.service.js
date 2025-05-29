const LevelRepository = require("../repositories/level.repository");

class LevelService {
    constructor() {
        this.levelRepository = new LevelRepository();
    }

    async create(data) {
        return await this.levelRepository.create(data);
    }

    async findAll() {
        return await this.levelRepository.findAll();
    }

    async findById(id) {
        return await this.levelRepository.findById(id);
    }
}

module.exports = LevelService;