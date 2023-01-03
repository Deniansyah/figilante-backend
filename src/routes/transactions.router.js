const usersRoutes = require("express").Router();
const {
  getAllTransactions,
  createTransactions,
} = require("../controllers/transactions.controller");

usersRoutes.get("/", getAllTransactions);
usersRoutes.post("/", createTransactions);

module.exports = usersRoutes;
