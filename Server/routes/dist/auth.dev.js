"use strict";

var _require = require("../models/users"),
    user = _require.user;

var express = require("express");

var router = express.Router();

var bycrypt = require("bcrypt");

var _require2 = require("../middlewares/jwt-related/sign-jwt"),
    signJwt = _require2.signJwt;

var _require3 = require("../Joi-Validations/SignIn"),
    validateSignInParams = _require3.validateSignInParams;

router.post("/", function _callee(req, res) {
  var _validateSignInParams, error, accountUser, validPassword, token, cookieOptions;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _validateSignInParams = validateSignInParams(req.body), error = _validateSignInParams.error;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            joiError: error.details[0].message
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(user.findOne({
            email: req.body.email
          }));

        case 6:
          accountUser = _context.sent;

          if (accountUser) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            invalidLoginDetails: "Invalid email or password"
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(bycrypt.compare(req.body.password, accountUser.password));

        case 11:
          validPassword = _context.sent;

          if (validPassword) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            invalidLoginDetails: "Invalid email or password"
          }));

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(signJwt(accountUser));

        case 16:
          token = _context.sent;

          if (token) {
            _context.next = 19;
            break;
          }

          return _context.abrupt("return", console.log("token not found"));

        case 19:
          cookieOptions = {
            maxAge: 1209600000,
            secure: true,
            httpOnly: true
          };
          console.log("signed in");
          res.cookie("cftAuth", token, cookieOptions).json({
            signedIn: true,
            token: token
          });
          _context.next = 28;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);
          return _context.abrupt("return", res.json({
            error: _context.t0
          }));

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 24]]);
});
module.exports = router;