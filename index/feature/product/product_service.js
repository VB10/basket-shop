const express = require("express");
const router = express.Router();
const httpStatusCode = require("http-status-codes");
const mongoose = require("mongoose");

const productPath = "/product";
const productsPath = "/products";
const Product = require("./model/product_model");

router.get(productsPath, (_, res) => {
  Product.find((err, product) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(product);
    }
  });
});

router.post(productPath, (req, res) => {
  const product = new Product(req.body);
  product.save((err, data) => {
    if (err) {
      return res.status(httpStatusCode.NOT_ACCEPTABLE).json(err);
    } else {
      return res.status(httpStatusCode.OK).json(data);
    }
  });
});

module.exports = router;
