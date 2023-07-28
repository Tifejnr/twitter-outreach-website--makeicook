"use strict";

var CryptoJS = require("crypto-js");

var _require = require("../../models/users"),
    user = _require.user;

var _require2 = require("../../envKeys/allKeys"),
    getKeys = _require2.getKeys;

var keysObject = getKeys();
var CRYPTO_SECRET_KEY = keysObject.CRYPTO_SECRET_KEY;

module.exports = function _callee(req, res, next) {
  var accountUser, iv, encryptedToken, decryptedData, decryptedToken;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(user.findById(userDetails._id));

        case 3:
          accountUser = _context.sent;
          iv = accountUser.iv;
          encryptedToken = accountUser.trello_token;
          decryptedData = CryptoJS.AES.decrypt(encryptedToken, CRYPTO_SECRET_KEY, {
            iv: iv
          }); // Convert the decrypted data to a readable string (assuming the original plaintext was a string)

          decryptedToken = decryptedData.toString(CryptoJS.enc.Utf8);
          token = decryptedToken;
          key = keysObject.CLIENT_SECRET_KEY;
          signature = accountUser.sessionSignature;

          if (!(!token && !key)) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            unauthorizedToken: true
          }));

        case 13:
          next();
          _context.next = 21;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(400).json({
            unauthorizedToken: true
          });
          return _context.abrupt("return", false);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};