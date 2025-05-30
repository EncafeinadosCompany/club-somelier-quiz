'use strict';

const { QUESTION_TABLE } = require('../../models/question.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(QUESTION_TABLE, [
      {
        question: '¿El PICANTE es una sensación TRIGEMINAL?',
        response: true, // REALIDAD
        level_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: '¿Los PROBLEMAS DENTALES son causantes de la disminución de la capacidad de detectar olores?',
        response: true, // REALIDAD
        level_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: '¿Los PROBLEMAS DENTALES no tienen nada que ver con detectar olores?',
        response: false, // MITO
        level_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: '¿Una de las energías que perciben los sentidos es la ENERGÍA MECANICA?',
        response: true, // REALIDAD
        level_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: '¿SALADO, ACIDO y AMARGO hacen parte de los 5 sabores reconocidos?',
        response: true, // REALIDAD
        level_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: '¿SALADO, ACIDO Y AMARGO hacen parte de los 8 sabores reconocidos?',
        response: false, // MITO
        level_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: '¿La HIPOGEUCIA es cuando se reduce la capacidad de DEGUSTAR?',
        response: true, // REALIDAD
        level_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: '¿La HIPOGEUCIA es cuando se reduce la capacidad de OLER?',
        response: false, // MITO
        level_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: '¿El tiempo que se requiere para que una carne pase de MUSCULO A CARNE es entre 48 y 72 horas?',
        response: true, // REALIDAD
        level_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(QUESTION_TABLE, null, {});
  }
};