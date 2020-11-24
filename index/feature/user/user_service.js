const express = require("express");
const router = express.Router();
const httpStatusCode = require("http-status-codes");
const mongoose = require("mongoose");

const userBasketPath = "/basket";
const userPath = "/user";
const User = require("./user_model");
const { productRequest } = require("../product/model/product_request_model");
const Product = require("../product/model/product_model");
const { json } = require("express");

router.get(userPath, (req, res) => {
  var id = req.headers["user-id"];

  User.findById(id, (err, doc) => {
    if (err) {
      return res.status(httpStatusCode.NOT_FOUND).json(err);
    } else {
      if (!doc) {
        return res.status(httpStatusCode.OK).jsonp(doc);
      } else {
        console.log("message2");
        return res.status(httpStatusCode.OK).jsonp(doc);
      }
    }
  });
});

router.post(userBasketPath, (req, res) => {
  var id = req.headers["user-id"];
  if (!id) {
    return res
      .status(httpStatusCode.NOT_FOUND)
      .json({ message: "id not found" });
  }

  const _productRequest = new productRequest(req.body);
  if (!_productRequest.count && !_productRequest.productId) {
    return res
      .status(httpStatusCode.NOT_FOUND)
      .json({ message: "Product Request Model Error" });
  }

  Product.findById(_productRequest.productId, (err, product) => {
    if (product) {
      User.findById(id, (_, user) => {
        if (user && user.money > product.price * _productRequest.count) {
          user.money -= product.price * _productRequest.count;
          user.save((err, data) => {
            if (err) {
              return res.status(httpStatusCode.NOT_FOUND).json(err);
            }
            return res.json({ message: "Success", data });
          });
        } else {
          return res.json({
            message: "Not passed, it's has not enough money.",
          });
        }
      });
    } else {
      return res.status(httpStatusCode.NOT_FOUND).json(err);
    }
  });
});

router.get(`${userPath}/all`, (_, res) => {
  User.find((err, users) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(users);
    }
  });
});

router.post(userPath, (req, res) => {
  const data = req.body;
  console.log(data);
  const user = new User(data);
  user.save((err, data) => {
    if (err) {
      return res.status(httpStatusCode.NOT_ACCEPTABLE).json(err);
    } else {
      return res.status(httpStatusCode.OK).json(data);
    }
  });
});

module.exports = router;
