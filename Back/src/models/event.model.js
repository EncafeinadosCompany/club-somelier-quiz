const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");
const {ADMIN_TABLE}= require("../models/admin.model")
const {QUESTIONNAIRE_TABLE}= require("../models/questionnaire.model")

const EVENT_TABLE = "events";

const Event = sequelize.define(
  EVENT_TABLE,
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    questionnaire_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: QUESTIONNAIRE_TABLE,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_time: {
       type: DataTypes.DATE,
        allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ADMIN_TABLE,
        key: "id",
      },
    },
  },
  {
    tableName: EVENT_TABLE,
    timestamps: true,
  }
);

module.exports = {Event, EVENT_TABLE}
