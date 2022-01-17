require("express-async-errors");
require("dotenv").config();
const express = require("express");
const ConnectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const auth = require("./routes/api/auth");
const app = express();
const cookieParser = require("cookie-parser");
const post = require("./routes/api/post");
const comment = require("./routes/api/comment");

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const cleanCache = require("./middleware/cleanCache");
const { protect } = require("./middleware/auth");
const { Error } = require("mongoose");
ConnectDB();
app.get("/test", protect, cleanCache, async (req, res) => {
  res.send(`<h1>server PID : ${process.pid}</h1>`);
});

require("./utils/Cache");
app.use(express.json());
app.use(cookieParser());
// sanitize data
app.use(mongoSanitize());

// set security headers
app.use(helmet());

// prevent xss attacks
app.use(xss());

// rate limiter
const limit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "Vous ne pouvez pas faire plus de 100 requets en 10 minutes.",
});
app.use(limit);

// prevent http param polution
app.use(hpp());

app.use(cors());
app.use("/", express.static("public"));
app.use("/api", auth, post, comment);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`${process.argv[2]} is listening at ${PORT} `)
);
