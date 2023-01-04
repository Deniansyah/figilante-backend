const usersRoutes = require("express").Router();
const {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePicture,
} = require("../controllers/profile.controller");
const upload = require("../middlewares/upload.middleware");

usersRoutes.get("/", getProfile);
usersRoutes.patch("/", upload, updateProfile);
usersRoutes.patch("/changePassword", changePassword);
usersRoutes.patch("/uploadProfilePicture", upload, uploadProfilePicture);

module.exports = usersRoutes;
