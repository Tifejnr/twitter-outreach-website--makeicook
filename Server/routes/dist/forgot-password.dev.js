"use strict";

var _require = require("../models/users"),
    user = _require.user;

var express = require("express");

var router = express.Router();

var _ = require("lodash");

var bycrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var nodemailer = require("nodemailer");

var _require2 = require("../Joi-Validations/emailAloneValidation"),
    validateEmail = _require2.validateEmail;

var _require3 = require("../envKeys/allKeys"),
    getKeys = _require3.getKeys;

var keysObject = getKeys();
router.post("/", function _callee(req, res) {
  var JWT_PRIVATE_KEY, emailUsername, emailPassword, _validateEmail, error, accountUser, secret, payload, token, link, transporter, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;
          emailUsername = keysObject.emailUsername;
          emailPassword = keysObject.emailPassword;
          _validateEmail = validateEmail(req.body), error = _validateEmail.error;

          if (!error) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            emailValError: error.details[0].message
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(user.findOne({
            email: req.body.email
          }));

        case 8:
          accountUser = _context.sent;

          if (accountUser) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            notFoundUserEmail: "User not found"
          }));

        case 11:
          secret = JWT_PRIVATE_KEY + accountUser.password;
          payload = {
            email: accountUser.email,
            id: accountUser.id
          };
          token = jwt.sign(payload, secret, {
            expiresIn: "10m"
          });
          link = "https://workforreputation.com/api/forgot-password/".concat(accountUser.id, "/").concat(token);
          transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: emailUsername,
              pass: emailPassword
            }
          });
          _context.next = 18;
          return regeneratorRuntime.awrap(transporter.sendMail({
            from: emailUsername,
            to: "".concat(accountUser.email),
            subject: "Password Reset",
            text: "  \t\n        Hi ".concat(accountUser.fullName, ",\n\n        A password reset event has been triggered. The password reset window is limited to 20 minutes.\n\n        If you do not reset your password within 20 minutes, you will need to submit a new request.\n\n        To complete the password reset process, visit the following link:\n\n        ").concat(link)
          }));

        case 18:
          result = _context.sent;

          if (!result) {
            _context.next = 21;
            break;
          }

          return _context.abrupt("return", res.json({
            emailSent: true
          }));

        case 21:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/:id/:token", function _callee2(req, res) {
  var id, token, accountUser, verifiedToken;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          res.cookie("reset_id", id, {
            maxAge: 100000,
            httpOnly: true
          });
          token = req.params.token;
          _context2.next = 5;
          return regeneratorRuntime.awrap(user.findOne({
            _id: id
          }));

        case 5:
          accountUser = _context2.sent;

          if (accountUser) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            notFoundUser: "User not found"
          }));

        case 8:
          _context2.prev = 8;
          verifiedToken = jwt.verify(token, secret);

          if (!verifiedToken) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.cookie("reset_pass", token, {
            maxAge: 100000,
            httpOnly: true
          }).render("reset-password"));

        case 12:
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](8);
          res.send({
            tokenExpired: true
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[8, 14]]);
});
router.post("/:id/:token", function _callee3(req, res) {
  var keysObject, JWT_PRIVATE_KEY, newPassword, token, userId, accountUser, _secret, decodedPayload, salt, hashedPassword, passwordUpdated;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          keysObject = getSecretKeys();
          JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;
          newPassword = req.body.password;
          token = req.cookies.reset_pass;
          userId = req.cookies.reset_id;
          _context3.next = 7;
          return regeneratorRuntime.awrap(user.findOne({
            _id: userId
          }));

        case 7:
          accountUser = _context3.sent;

          if (accountUser) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            UsernotFound: "User not found"
          }));

        case 10:
          _context3.prev = 10;
          _secret = JWT_PRIVATE_KEY + accountUser.password;
          decodedPayload = jwt.verify(token, _secret);

          if (decodedPayload) {
            _context3.next = 15;
            break;
          }

          return _context3.abrupt("return", res.json({
            error: "token invalid"
          }));

        case 15:
          _context3.next = 17;
          return regeneratorRuntime.awrap(bycrypt.genSalt(10));

        case 17:
          salt = _context3.sent;
          _context3.next = 20;
          return regeneratorRuntime.awrap(bycrypt.hash(newPassword, salt));

        case 20:
          hashedPassword = _context3.sent;
          accountUser.set({
            password: hashedPassword
          });
          _context3.next = 24;
          return regeneratorRuntime.awrap(accountUser.save());

        case 24:
          passwordUpdated = _context3.sent;

          if (!passwordUpdated) {
            _context3.next = 27;
            break;
          }

          return _context3.abrupt("return", res.json({
            passwordUpdated: true
          }));

        case 27:
          _context3.next = 33;
          break;

        case 29:
          _context3.prev = 29;
          _context3.t0 = _context3["catch"](10);
          console.log(_context3.t0.message);
          res.json({
            error: _context3.t0.message
          });

        case 33:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[10, 29]]);
});
module.exports = router;