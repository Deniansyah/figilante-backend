const categoriesController = require("express").Router();

const { getAllCategories } = require("../controllers/categories.controller");

categoriesController.get("/", getAllCategories);

module.exports = categoriesController;
