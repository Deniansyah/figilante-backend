const { register, login } = require("../controllers/auth.controller");

const registerRouter = require("express").Router();

registerRouter.post("/register", register);
registerRouter.post("/login", login);

module.exports = registerRouter;
