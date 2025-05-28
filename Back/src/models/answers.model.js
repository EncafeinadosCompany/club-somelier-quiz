const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');
const {EVENT_TABLE}= require('../models/event.model')
const {QUESTION_TABLE}= require('../models/question.model')


const ANSWER_TABLE = 'answers';
const Answer = sequelize.define(ANSWER_TABLE, {
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
            model: QUESTION_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    participant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PARTICIPANT_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    response: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    response_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    points_awarded: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    tableName: ANSWER_TABLE,
    timestamps: true
});

module.exports = { Answer, ANSWER_TABLE };