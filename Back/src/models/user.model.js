const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');
const { ROLE_TABLE } = require('./role.model');

const USER_TABLE = 'users';

const User = sequelize.define(USER_TABLE, {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ROLE_TABLE,
      key: "id",
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  tableName: USER_TABLE,
  timestamps: true, // crea createdAt y updatedAt
});

module.exports = { User, USER_TABLE };
