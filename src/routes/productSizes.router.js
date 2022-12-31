const usersRoutes = require("express").Router();
const {
  getProductSizes,
  getProductSize,
  createProductSize,
  updateProductSize,
  deleteProductSize,
} = require("../controllers/productSizes.controller");

usersRoutes.get("/", getProductSizes);
usersRoutes.get("/:id", getProductSize);
usersRoutes.post("/", createProductSize);
usersRoutes.patch("/:id", updateProductSize);
usersRoutes.delete("/:id", deleteProductSize);

module.exports = usersRoutes;
