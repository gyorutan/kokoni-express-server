const mongoose = require("mongoose");

exports.connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(console.log("Connected on MongoDB"))
    .catch((err) => console.log(err.message));
};