import { DataTypes } from "sequelize";
import { sequelize } from "../services/db.js";

export const Quiz = sequelize.define("Quiz", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quiz: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  answers: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
