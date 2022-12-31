const productsController = require("express").Router();

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");

productsController.get("/", getAllProducts);
productsController.get("/:id", getProduct);
productsController.post("/", createProduct);
productsController.patch("/:id", updateProduct);
productsController.delete("/:id", deleteProduct);

module.exports = productsController;
