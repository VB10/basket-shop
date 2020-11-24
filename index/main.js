const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userService = require("./feature/user/user_service");
const productService = require("./feature/product/product_service");

mongoose.connect("mongodb://localhost/shoppi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userService);
app.use(productService);

app.listen(port, () => console.log(`Example app listening on port port!`));
