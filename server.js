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
ConnectDB();
app.use(express.json());
app.use(cookieParser());
// sanitize data
app.use(mongoSanitize());

// set security headers
app.use(helmet());

//prevent xss attacks
app.use(xss());

// rate limiter
const limit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limit);

// prevent http param polution
app.use(hpp());

// enable cors
app.use(cors());

app.use("/api", auth, post, comment);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}... `));
