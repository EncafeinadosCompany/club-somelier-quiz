const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

const PARTICIPANT_TABLE = 'participants';

const Participant = sequelize.define(PARTICIPANT_TABLE, {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  numberPhone: {
    type: DataTypes.STRING,
    allowNull: true
  }
  // role_id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: ROLE_TABLE,
  //     key: "id",
  //   },
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE',
  // },
}, {
  tableName: PARTICIPANT_TABLE,
  timestamps: true
});

module.exports = { Participant, PARTICIPANT_TABLE };
