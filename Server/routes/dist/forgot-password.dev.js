"use strict";

var _require = require("../models/users"),
    user = _require.user;

var express = require("express");

var router = express.Router();

var _ = require("lodash");

var bycrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var _require2 = require("../middlewares/Email-sending/emailTemplate"),
    sendEmail = _require2.sendEmail;

var _require3 = require("../Joi-Validations/emailAloneValidation"),
    validateEmail = _require3.validateEmail;

var _require4 = require("../envKeys/allKeys"),
    getKeys = _require4.getKeys;

var keysObject = getKeys();
var JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;
var websiteUrl = "http://localhost:3000";
var websiteUrlClient = "http://localhost:5173/reset-password"; // const websiteUrlClient = "https://www.collabfortrello.com";

router.post("/", function _callee(req, res) {
  var _validateEmail, error, accountUser, secret, payload, token, link, folderDir, subject, customerEmail, fullName, customerParams, resetPasswordEmailContent, isEmailSentToUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _validateEmail = validateEmail(req.body), error = _validateEmail.error;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            emailValError: error.details[0].message
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(user.findOne({
            email: req.body.email
          }));

        case 5:
          accountUser = _context.sent;

          if (accountUser) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            notFoundUserEmail: "User not found"
          }));

        case 8:
          secret = JWT_PRIVATE_KEY + accountUser.password;
          payload = {
            email: accountUser.email,
            id: accountUser.id
          };
          token = jwt.sign(payload, secret, {
            expiresIn: "10m"
          });
          link = "".concat(websiteUrl, "/api/forgot-password/").concat(accountUser.id, "/").concat(token);
          folderDir = "./reset-password-email";
          subject = "Password Reset";
          customerEmail = accountUser.email;
          fullName = accountUser.name;
          customerParams = {
            subject: subject,
            folderDir: folderDir,
            customerEmail: customerEmail
          };
          resetPasswordEmailContent = {
            fullName: fullName,
            resetPasswordLink: link
          };
          _context.next = 20;
          return regeneratorRuntime.awrap(sendEmail(customerParams, resetPasswordEmailContent));

        case 20:
          isEmailSentToUser = _context.sent;

          if (!isEmailSentToUser.error) {
            _context.next = 23;
            break;
          }

          return _context.abrupt("return", res.status(402).json({
            emailSentError: true
          }));

        case 23:
          if (!isEmailSentToUser.info) {
            _context.next = 25;
            break;
          }

          return _context.abrupt("return", res.status(200).json({
            emailSent: true
          }));

        case 25:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/:id/:token", function _callee2(req, res) {
  var urlQeryParams, id, token, accountUser, secret, verifiedToken;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          urlQeryParams = req.params;
          id = urlQeryParams.id, token = urlQeryParams.token;
          res.cookie("reset_id", id, {
            maxAge: 100000,
            httpOnly: true
          });
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
          secret = JWT_PRIVATE_KEY + accountUser.password;
          _context2.prev = 9;
          verifiedToken = jwt.verify(token, secret);

          if (!verifiedToken) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", res.cookie("reset_pass", token, {
            maxAge: 100000,
            httpOnly: true
          }).redirect(websiteUrlClient));

        case 13:
          _context2.next = 19;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](9);
          console.log(_context2.t0);
          res.send({
            tokenExpired: true
          });

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[9, 15]]);
}); //reset password route

router.post("/:id/:token", function _callee3(req, res) {
  var keysObject, JWT_PRIVATE_KEY, newPassword, token, userId, accountUser, secret, decodedPayload, salt, hashedPassword, passwordUpdated;
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
          secret = JWT_PRIVATE_KEY + accountUser.password;
          decodedPayload = jwt.verify(token, secret);

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