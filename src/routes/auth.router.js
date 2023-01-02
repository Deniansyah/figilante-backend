const registerRouter = require("express").Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const { validate, rules } = require("../middlewares/validator.middleware");

registerRouter.post("/register", rules("register"), validate, register);
registerRouter.post("/login", rules("login"), validate, login);
registerRouter.post(
  "/forgot-password",
  rules("forgotPassword"),
  validate,
  forgotPassword
);
registerRouter.post(
  "/reset-password",
  rules("resetPassword"),
  validate,
  resetPassword
);

module.exports = registerRouter;
