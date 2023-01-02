const productsController = require("express").Router();

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const upload = require("../middlewares/upload.middleware");

productsController.get("/", getAllProducts);
productsController.get("/:id", getProduct);
productsController.post("/", upload, createProduct);
productsController.patch("/:id", upload, updateProduct);
productsController.delete("/:id", deleteProduct);

module.exports = productsController;
