const express = require("express");
const routers = require("./src/routes");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/uploads", express.static("uploads/"));

app.use(routers);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
