const categoriesController = require("express").Router();

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.controller");

categoriesController.get("/", getAllCategories);
categoriesController.get("/:id", getCategory);
categoriesController.post("/", createCategory);
categoriesController.patch("/:id", updateCategory);
categoriesController.delete("/:id", deleteCategory);

module.exports = categoriesController;
