// import Sequelize from "sequelize";

import { Sequelize } from "sequelize";

const sequelize = new Sequelize("node-js", "root", "Ajay123sql", {
  dialect: "mysql",
  host: "localhost",
});

// module.exports = sequelize;
export { sequelize };
