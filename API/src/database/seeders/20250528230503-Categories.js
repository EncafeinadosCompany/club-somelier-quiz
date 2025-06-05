'use strict';

const { CATEGORIE_TABLE } = require('../../models/categories.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Elimina las categorías existentes
    await queryInterface.bulkDelete(CATEGORIE_TABLE, null, {});

    // Inserta las nuevas categorías individualmente
    return queryInterface.bulkInsert(CATEGORIE_TABLE, [
      {
        name: 'Carnes',
        description: 'Preguntas sobre tipos de carnes, orígenes y preparación.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Asados',
        description: 'Preguntas sobre técnicas de asado, condimentos y métodos de cocción a la parrilla.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cortes',
        description: 'Preguntas sobre cortes de carne, sus características y usos en gastronomía.',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Elimina las categorías que se insertaron
    await queryInterface.bulkDelete(CATEGORIE_TABLE, {
      name: { [Sequelize.Op.in]: ['Carnes', 'Asados', 'Cortes'] }
    }, {});
  }
};