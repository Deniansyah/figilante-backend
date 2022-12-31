const productCategoriesController = require("express").Router();

const {
  getAllProductCategories,
  getProductCategory,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
} = require("../controllers/productCategories.controller");

productCategoriesController.get("/", getAllProductCategories);
productCategoriesController.get("/:id", getProductCategory);
productCategoriesController.post("/", createProductCategory);
productCategoriesController.patch("/:id", updateProductCategory);
productCategoriesController.delete("/:id", deleteProductCategory);

module.exports = productCategoriesController;
