const productsController = require("express").Router();

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsCust,
} = require("../controllers/products.controller");

productsController.get("/", getProductsCust);
productsController.get("/all", getAllProducts);
productsController.get("/:id", getProduct);
productsController.post("/", createProduct);
productsController.patch("/:id", updateProduct);
productsController.delete("/:id", deleteProduct);

module.exports = productsController;
