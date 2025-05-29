'use strict';

const { QUESTION_TABLE } = require('../../models/question.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(QUESTION_TABLE, [
      {
        question: '¿La Tierra es plana?',
        response: false,
        level_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: '¿El agua hierve a 100 grados Celsius?',
        response: true,
        level_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: '¿El sol gira alrededor de la Tierra?',
        response: false,
        level_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete(QUESTION_TABLE, null, {});

  }
};
