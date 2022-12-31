const routers = require("express").Router();

routers.use("/users", require("./users.router"));
routers.use("/chats", require("./chats.router"));

module.exports = routers;
