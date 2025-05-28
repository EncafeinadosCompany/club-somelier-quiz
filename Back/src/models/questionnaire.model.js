const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");
const {ADMIN_TABLE}= require("../models/admin.model")
const {CATEGORIE_TABLE}= require("../models/categories.model")

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
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: ADMIN_TABLE,
        key: "id",
      },
      onDelete: "SET NULL",
    },
    category_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CATEGORIE_TABLE,
        key: 'id',
      },
    },
  },
  {
    tableName: QUESTIONNAIRE_TABLE,
    timestamps: true,
  }
);

module.exports = { Questionnaire, QUESTIONNAIRE_TABLE };
