const chatsRoutes = require("express").Router();
const {
  getChats,
  getChat,
  getChatByUser,
  AdminList,
  createChat,
  updateChat,
  deleteChat,
} = require("../controllers/chats.controller");

chatsRoutes.get("/", getChats);
chatsRoutes.get("/user", getChatByUser);
chatsRoutes.get("/admin", AdminList);
chatsRoutes.get("/:id", getChat);
chatsRoutes.post("/", createChat);
chatsRoutes.patch("/:id", updateChat);
chatsRoutes.delete("/:id", deleteChat);

module.exports = chatsRoutes;
