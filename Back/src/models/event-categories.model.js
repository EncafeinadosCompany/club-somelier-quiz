const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');
const { CATEGORIE_TABLE } = require('./categories.model');
const { EVENT_TABLE } = require('./event.model');

const EVENT_CATEGORIES_TABLE = 'event_categories';

const EventCategory = sequelize.define(EVENT_CATEGORIES_TABLE, {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: EVENT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CATEGORIE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  }
}, {
  tableName: EVENT_CATEGORIES_TABLE,
  timestamps: false
});

module.exports = { EventCategory, EVENT_CATEGORIES_TABLE };