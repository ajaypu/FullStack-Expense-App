import { Expense } from "../models/expense.js";

const addExpense = async (req, res, next) => {
  try {
    if (!req.body.amount) {
      console.log(amount);
      throw new Error("Amount is mandatory");
    }

    const amount = req.body.amount;
    const description = req.body.desc;
    const category = req.body.category;

    const data = await Expense.create({
      amount: amount,
      description: description,
      category: category,
    });
    res.status(201).json({ newExpenseDetail: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const getExpense = async (req, res, next) => {
  try {
    const users = await Expense.findAll();
    res.status(200).json({ allUsers: users });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    if (req.params.id === "undefined") {
      return res.status(400).json({ err: "Id is missing" });
    }
    const eId = req.params.id;
    await Expense.destroy({ where: { id: eId } });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
};

// module.exports = {
//   addExpense,
//   getExpense,
//   deleteExpense,
// };

export { addExpense, getExpense, deleteExpense };
