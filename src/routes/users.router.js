const usersRoutes = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const upload = require("../middlewares/upload.middleware");

usersRoutes.get("/", getUsers);
usersRoutes.get("/:id", getUser);
usersRoutes.post("/", upload, createUser);
usersRoutes.patch("/:id", upload, updateUser);
usersRoutes.delete("/:id", deleteUser);

module.exports = usersRoutes;
