const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const QUESTIONNAIRE_TABLE = "questionnaires";

const Questionnaire = sequelize.define(
  QUESTIONNAIRE_TABLE,
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: QUESTIONNAIRE_TABLE,
    timestamps: true,
  }
);

module.exports = { Questionnaire, QUESTIONNAIRE_TABLE };
