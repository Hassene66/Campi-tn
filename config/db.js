const mongoose = require("mongoose");
const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to mongoDB"))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
module.exports = ConnectDB;
