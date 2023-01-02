const routers = require("express").Router();
const { auth } = require("../middlewares/auth.middleware");

routers.use("/users", auth, require("./users.router"));
routers.use("/deliveryMethods", auth, require("./deliveryMethods.router.js"));
routers.use("/chats", auth, require("./chats.router"));
routers.use("/carts", auth, require("./carts.router"));
routers.use("/sizes", auth, require("./sizes.router"));
routers.use("/categories", auth, require("./categories.router"));
routers.use("/products", auth, require("./products.router"));
routers.use("/productCategories", auth, require("./productCategories.router"));
routers.use("/productSizes", auth, require("./productSizes.router"));
routers.use("/paymentMethods", auth, require("./paymentMethods.router"));

routers.use("/auth", require("./auth.router"));
routers.use("/profile", auth, require("./profile.router"));

module.exports = routers;
