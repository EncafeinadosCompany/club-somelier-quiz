const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

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
            model: 'events',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'questions',
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