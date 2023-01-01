const paymentMethodsController = require("express").Router();

const {
  getPaymentMethods,
  getPaymentMethod,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} = require("../controllers/paymentMethods.controller");

paymentMethodsController.get("/", getPaymentMethods);
paymentMethodsController.get("/:id", getPaymentMethod);
paymentMethodsController.post("/", createPaymentMethod);
paymentMethodsController.patch("/:id", updatePaymentMethod);
paymentMethodsController.delete("/:id", deletePaymentMethod);

module.exports = paymentMethodsController;
