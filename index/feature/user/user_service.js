const express = require("express");
const router = express.Router();
const httpStatusCode = require("http-status-codes");
const mongoose = require("mongoose");

const userPath = "/user";
const User = require("./user_model");

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
