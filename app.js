// const path = require("path");
import path from "path";
// import Expense from "./models/expense";
// const sequelize = require("./util/database");
import { sequelize } from "./util/database.js";
import express from "express";
import bodyParser from "body-parser";
import expenseRoute from "./routes/expense.js";

const app = express();
const port = 8000;
import cors from "cors";
// var cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   res.setHeader("Referrer-Policy", "no-referrer");
//   next();
// });

app.use("/expense", expenseRoute);

app.use("/", (req, res, next) => {
  console.log("Hello world");
  next();
});
app.get("/", (req, res, next) => {
  res.send("hello");
});

sequelize
  .sync()
  .then((result) => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
