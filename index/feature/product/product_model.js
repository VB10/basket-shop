const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  total: {
    type: Number,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    unique: true,
  },
});

//Export the model
module.exports = mongoose.model("Product", productSchema);
