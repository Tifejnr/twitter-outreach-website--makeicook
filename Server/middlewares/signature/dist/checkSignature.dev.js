"use strict";

var _require = require("../../models/users"),
    user = _require.user;

var _require2 = require("../../envKeys/allKeys"),
    getKeys = _require2.getKeys;

var keysObject = getKeys();
var JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;
var creditsNoPerAction = 1;

module.exports = function _callee(req, res, next) {
  var _req$body, clientSignature, creditsCharged, userId, accountUser, serverSignature, creditsAvailable, newSessionSignature, remainingCredits;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, clientSignature = _req$body.clientSignature, creditsCharged = _req$body.creditsCharged;
          _context.prev = 1;
          userId = userDetails._id;
          _context.next = 5;
          return regeneratorRuntime.awrap(user.findById(userId));

        case 5:
          accountUser = _context.sent;
          serverSignature = accountUser.sessionSignature;
          creditsAvailable = accountUser.credits;

          if (!(creditsAvailable < 1)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(402).json({
            insufficientCredits: true
          }));

        case 10:
          if (!(clientSignature == serverSignature)) {
            _context.next = 18;
            break;
          }

          newSessionSignature = "".concat(clientSignature).concat(JWT_PRIVATE_KEY);
          accountUser.sessionSignature = newSessionSignature; //deduct a credit since it's a new session

          remainingCredits = accountUser.credits - Number(creditsCharged);
          accountUser.credits = remainingCredits;
          _context.next = 17;
          return regeneratorRuntime.awrap(accountUser.save());

        case 17:
          creditsDeducted = true;

        case 18:
          next();
          _context.next = 25;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).json({
            signatureCheckError: _context.t0
          }));

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 21]]);
};