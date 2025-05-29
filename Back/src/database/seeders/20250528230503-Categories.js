'use strict';

const { CATEGORIE_TABLE } = require('../../models/categories.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(CATEGORIE_TABLE, [
      {
        name: 'Cultura General',
        description: 'Preguntas sobre cultura general',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ciencia y Tecnología',
        description: 'Preguntas sobre ciencia y tecnología',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Historia',
        description: 'Preguntas sobre historia mundial',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Geografía',
        description: 'Preguntas sobre geografía mundial',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete(CATEGORIE_TABLE, null, {});

  }
};
