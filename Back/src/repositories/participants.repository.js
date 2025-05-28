const { User } = require('../models/user.model');

class UserRepository {
    async getAll() {
        return await User.findAll({
            include: {
                model: Role,
                as: 'role', // debe coincidir con el alias usado en belongsTo()
                // attributes: ['id', 'name'] // opcional: para traer solo campos específicos
            },
        });
    }

    async getById(id) {
        return await User.findByPk(id);
    }

    async create(data) {
        return await User.create(data);
    }

    async update(id, data) {
        return await User.update(data, { where: { id } });
    }

    async delete(id) {
        return await User.destroy({ where: { id } });
    }
}

module.exports = UserRepository;
