const chatsRoutes = require("express").Router();
const {
  getChats,
  getChat,
  createChat,
  updateChat,
  deleteChat,
} = require("../controllers/chats.controller");

chatsRoutes.get("/", getChats);
chatsRoutes.get("/:id", getChat);
chatsRoutes.post("/", createChat);
chatsRoutes.patch("/:id", updateChat);
chatsRoutes.delete("/:id", deleteChat);

module.exports = chatsRoutes;
