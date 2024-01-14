const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  company: String,
  userID: String,
  category: String,
});

module.exports = mongoose.model("products", productSchema);
