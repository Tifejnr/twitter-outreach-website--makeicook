"use strict";

var _require = require("../models/users"),
    user = _require.user;

var express = require("express");

var mongoose = require("mongoose");

var router = express.Router();

var _ = require("lodash");

var bycrypt = require("bcrypt");

var Joi = require("joi");

var jwt = require("jsonwebtoken");

var coookieParser = require("cookie-parser");

var _require2 = require("../middleware/getSecretKeys"),
    getSecretKeys = _require2.getSecretKeys;

function validate(req) {
  var schema = Joi.object({
    email: Joi.string().min(3).max(250).required().email(),
    password: Joi.string().min(3).max(250).required()
  });
  return schema.validate(req);
}

router.post("/", function _callee(req, res) {
  var keysObject, JWT_PRIVATE_KEY, _validate, error, accountUser, validPassword, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getSecretKeys());

        case 2:
          keysObject = _context.sent;
          JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;
          _validate = validate(req.body), error = _validate.error;

          if (!error) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            emailError: error.details[0].message
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(user.findOne({
            email: req.body.email
          }));

        case 9:
          accountUser = _context.sent;

          if (accountUser) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            invalidLoginDetails: "Invalid email or password"
          }));

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(bycrypt.compare(req.body.password, accountUser.password));

        case 14:
          validPassword = _context.sent;

          if (validPassword) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            invalidLoginDetails: "Invalid email or password"
          }));

        case 17:
          token = jwt.sign({
            _id: accountUser._id,
            isPaid: accountUser.isPaid
          }, JWT_PRIVATE_KEY);
          res.cookie("xAuth", token, {
            maxAge: 1209600000,
            httpOnly: true,
            secure: true
          }).json({
            token: "t"
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;