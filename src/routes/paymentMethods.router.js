const paymentMethodsController = require("express").Router();

const {
  getPaymentMethods,
  getPaymentMethod,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} = require("../controllers/paymentMethods.controller");
const upload = require("../middlewares/upload.middleware");

paymentMethodsController.get("/", getPaymentMethods);
paymentMethodsController.get("/:id", getPaymentMethod);
paymentMethodsController.post("/", upload, createPaymentMethod);
paymentMethodsController.patch("/:id", upload, updatePaymentMethod);
paymentMethodsController.delete("/:id", deletePaymentMethod);

module.exports = paymentMethodsController;
