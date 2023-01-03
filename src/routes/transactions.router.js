const usersRoutes = require("express").Router();
const {
  getAllTransactions,
} = require("../controllers/transactions.controller");

usersRoutes.get("/", getAllTransactions);

module.exports = usersRoutes;
