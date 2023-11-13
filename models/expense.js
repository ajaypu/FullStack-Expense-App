import Sequelize from "sequelize";
import { sequelize } from "../util/database.js";

const Expense = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: Sequelize.INTEGER,
  description: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
});

// module.exports = { Expense };

export { Expense };
