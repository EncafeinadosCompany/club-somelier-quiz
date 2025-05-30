'use strict';

const { LEVEL_TABLE } = require('../../models/level.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert(LEVEL_TABLE, [
      {
        name: 'Nivel 1',
        points: 100,
        description: 'Especialistas en gastronomía y estudiantes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nivel 2',
        points: 200,
        description: 'Entendidos en la materia, pero no gastrónomos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nivel 3',
        points: 300,
        description: 'Pregunta para personas con conocimiento avanzado',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete(LEVEL_TABLE, null, {});

  }
};
