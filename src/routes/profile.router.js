const usersRoutes = require("express").Router();
const {
  getProfile,
  updateProfile,
} = require("../controllers/profile.controller");
const upload = require("../middlewares/upload.middleware");

usersRoutes.get("/", getProfile);
usersRoutes.patch("/", upload, updateProfile);

module.exports = usersRoutes;
