const usersRoutes = require("express").Router();
const {
  getAllTransactions,
  createTransactions,
  deleteTransactions,
} = require("../controllers/transactions.controller");

usersRoutes.get("/", getAllTransactions);
usersRoutes.post("/", createTransactions);
usersRoutes.delete("/", deleteTransactions);

module.exports = usersRoutes;
