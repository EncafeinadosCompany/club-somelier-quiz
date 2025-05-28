const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

const ROLE_TABLE = 'roles';

const Role = sequelize.define(ROLE_TABLE, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: ROLE_TABLE,
    timestamps: false
});

module.exports = { Role, ROLE_TABLE };
