import express from "express";
const router = express.Router();
// const expenseController = require("../controllers/expense");
import {
  addExpense,
  getExpense,
  deleteExpense,
} from "../controllers/expense.js";

router.get("/get-expense", getExpense);
router.post("/add-expense", addExpense);
router.delete("/delete-expense", deleteExpense);

export default router;
