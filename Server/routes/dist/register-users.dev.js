"use strict";

var _require = require("../models/users"),
    user = _require.user;

var express = require("express");

var router = express.Router();

var _ = require("lodash");

var bycrypt = require("bcrypt");

var _require2 = require("../middlewares/jwt-related/sign-jwt"),
    signJwt = _require2.signJwt;

var _require3 = require("../Joi-Validations/register-validation"),
    validateRegsiterParams = _require3.validateRegsiterParams;

router.post("/", function _callee(req, res) {
  var _validateRegsiterPara, error, accountUserExists, accountUser, salt, token, cookieOptions;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _validateRegsiterPara = validateRegsiterParams(req.body), error = _validateRegsiterPara.error;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            emailError: error.details[0].message
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(user.findOne({
            email: req.body.email
          }));

        case 6:
          accountUserExists = _context.sent;

          if (!accountUserExists) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            alreadyRegistered: "User already registered"
          }));

        case 9:
          accountUser = new user(_.pick(req.body, ["email", "password"]));
          _context.next = 12;
          return regeneratorRuntime.awrap(bycrypt.genSalt(11));

        case 12:
          salt = _context.sent;
          _context.next = 15;
          return regeneratorRuntime.awrap(bycrypt.hash(accountUser.password, salt));

        case 15:
          accountUser.password = _context.sent;
          accountUser.credits = 5;
          _context.next = 19;
          return regeneratorRuntime.awrap(accountUser.save());

        case 19:
          console.log(accountUser);
          _context.next = 22;
          return regeneratorRuntime.awrap(signJwt(accountUser));

        case 22:
          token = _context.sent;
          cookieOptions = {
            maxAge: 1209600000,
            secure: true
          };
          res.cookie("cftAuth", token, cookieOptions).json({
            registered: true,
            token: token
          });
          console.log("registered");
          _context.next = 32;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);
          res.json({
            error: _context.t0
          });

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 28]]);
});
module.exports = router;