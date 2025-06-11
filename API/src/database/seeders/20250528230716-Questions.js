'use strict';

const { QUESTION_TABLE } = require('../../models/question.model');
const { QUESTION_CATEGORY_TABLE } = require('../../models/question-category.model');
const { CATEGORIE_TABLE } = require('../../models/categories.model');
const SeederHelper = require('../helper/seeder.helper');
const RelationSeederHelper = require('../helper/question-seeder.helper');

const questionsData = require('../data/questions.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const questions = questionsData.map(q => ({
        question: q.question,
        response: q.response,
        level_id: q.level_id
      }));

      await SeederHelper.seedData(queryInterface, QUESTION_TABLE, questions, 'question');

      await RelationSeederHelper.seedRelations(
        queryInterface,
        QUESTION_TABLE,
        CATEGORIE_TABLE,
        QUESTION_CATEGORY_TABLE,
        questionsData,
        'question',
        'name',
        'question_id',
        'category_id',
        'categories'
      );
      console.log('✅ Questions and relations seeded successfully');
      return true;
    } catch (error) {
      console.error(`❌ Error seeding questions: ${error.message}`);
      return false;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete(QUESTION_CATEGORY_TABLE, null, {});

      const questions = questionsData.map(q => q.question);
      await queryInterface.bulkDelete(QUESTION_TABLE, {
        question: { [Sequelize.Op.in]: questions }
      }, {});

    } catch (error) {
      throw new Error(`❌ Error deleting questions: ${error.message}`);
    }
  }
};