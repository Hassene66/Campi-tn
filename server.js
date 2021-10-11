require("express-async-errors");
require("dotenv").config();
const express = require("express");
const ConnectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const auth = require("./routes/api/auth");
const app = express();
const cookieParser = require("cookie-parser");
const { protect, authorize } = require("./middleware/auth");
ConnectDB();

app.use(express.json());
app.use(cookieParser());
app.get("/", protect, (req, res, next) => {
  res.status(200).send("testing protected route");
});
app.use("/api", auth);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}... `));
