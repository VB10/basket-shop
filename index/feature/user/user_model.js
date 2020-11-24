//Creating a Auth Model in userModel.js
const mongoose = require("mongoose"); // Erase if already required

const Product = require("../product/product_model").schema;
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  money: {
    type: Number,
    required: true,
    unique: true,
  },
  basket: [Product],
});

//Export the model
module.exports = mongoose.model("User", userSchema);
