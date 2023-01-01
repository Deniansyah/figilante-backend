const { register } = require("../controllers/auth.controller");

const registerRouter = require("express").Router();

registerRouter.post("/register", register);

module.exports = registerRouter;
