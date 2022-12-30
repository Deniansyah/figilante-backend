const usersRoutes = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

usersRoutes.get("/", getUsers);
usersRoutes.get("/:id", getUser);
usersRoutes.post("/", createUser);
usersRoutes.patch("/:id", updateUser);
usersRoutes.delete("/:id", deleteUser);

module.exports = usersRoutes;
