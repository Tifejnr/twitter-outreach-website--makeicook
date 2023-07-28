"use strict";

var _require = require("../../models/users"),
    user = _require.user;

var creditsNoPerAction = 1;

module.exports = function _callee(req, res, next) {
  var clientSignature, userId, accountUser, remainingCredits;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          clientSignature = req.body.clientSignature;
          _context.prev = 1;

          if (!(creditsAvailable < 1)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(402).json({
            insufficientCredits: true
          }));

        case 4:
          if (!(!clientSignature === serverSignature)) {
            _context.next = 15;
            break;
          }

          userId = userDetails._id; // const userId = "64ad80b631825676a3fcec77";

          _context.next = 8;
          return regeneratorRuntime.awrap(user.findById(userId));

        case 8:
          accountUser = _context.sent;
          console.log(accountUser.credits);
          remainingCredits = accountUser.credits - creditsNoPerAction;
          accountUser.credits = remainingCredits;
          _context.next = 14;
          return regeneratorRuntime.awrap(accountUser.save());

        case 14:
          console.log(accountUser.credits);

        case 15:
          next();
          _context.next = 23;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.status(400).json({
            somethingWentWrong: true
          });
          return _context.abrupt("return", false);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 18]]);
};