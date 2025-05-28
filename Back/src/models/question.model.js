const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");
const { LEVEL_TABLE } = require("../models/level.model");
const { ADMIN_TABLE } = require("../models/admin.model");

const QUESTION_TABLE = "questions";

const Question = sequelize.define(
  QUESTION_TABLE,
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    level_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: LEVEL_TABLE,
        key: "id",
      },
      onDelete: "RESTRICT",
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: ADMIN_TABLE,
        key: "id",
      },
      onDelete: "SET NULL",
    },
  },
  {
    tableName: QUESTION_TABLE,
    timestamps: true,
  }
);

module.exports = { Question, QUESTION_TABLE };
