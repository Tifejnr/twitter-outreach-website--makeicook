"use strict";

var _require = require("../models/users"),
    user = _require.user;

var express = require("express");

var router = express.Router();
var creditsNoPerAction = 1;
router.post("/", function _callee(req, res) {
  var userId, accountUser, remainingCredits;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = userDetails._id; // const userId = "64ad80b631825676a3fcec77";

          _context.next = 4;
          return regeneratorRuntime.awrap(user.findById(userId));

        case 4:
          accountUser = _context.sent;
          remainingCredits = accountUser.credits - creditsNoPerAction;
          accountUser.credits = remainingCredits;
          _context.next = 9;
          return regeneratorRuntime.awrap(accountUser.save());

        case 9:
          res.status(200).json({
            accountUser: accountUser
          });
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.json({
            error: _context.t0
          }));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
module.exports = router;