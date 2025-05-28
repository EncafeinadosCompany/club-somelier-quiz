const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');
const { CATEGORIE_TABLE } = require('./categories.model');
const { EVENT_TABLE } = require('./event.model');

const EVENT_QUESTIONS_TABLE = 'event_questions';

const EventQuestion = sequelize.define(EVENT_QUESTIONS_TABLE, {
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
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CATEGORIE_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: true
    }
},
    {
        tableName: EVENT_QUESTIONS_TABLE,
        timestamps: false
    }
);

module.exports = { EventQuestion, EVENT_QUESTIONS_TABLE };