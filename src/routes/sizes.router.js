const usersRoutes = require("express").Router();
const {
  getAllSizes,
  getSizeById,
  createSize,
  updateSize,
  deleteSize,
} = require("../controllers/sizes.controller");

usersRoutes.get("/", getAllSizes);
usersRoutes.get("/:id", getSizeById);
usersRoutes.post("/", createSize);
usersRoutes.patch("/:id", updateSize);
usersRoutes.delete("/:id", deleteSize);

module.exports = usersRoutes;
