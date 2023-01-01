const registerRouter = require("express").Router();
const { register, login, forgotPassword, resetPassword } = require("../controllers/auth.controller");

registerRouter.post("/register", register);
registerRouter.post("/login", login);
registerRouter.post("/forgot-password", forgotPassword);
registerRouter.post("/reset-password", resetPassword);

module.exports = registerRouter;
