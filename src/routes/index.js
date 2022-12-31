const routers = require("express").Router();

routers.use("/users", require("./users.router"));
routers.use("/deliveryMethods", require("./deliveryMethods.router.js"));
routers.use("/chats", require("./chats.router"));
routers.use("/sizes", require("./sizes.router"));
routers.use("/categories", require("./categories.router"));
routers.use("/products", require("./products.router"));

module.exports = routers;
