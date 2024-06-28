const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

module.exports.connect = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.warn("MongoDB started");
    })
    .catch((error) => console.log("Error Connecting to MongoDB", error));
};
