"use strict";

var _require = require("../models/users"),
    user = _require.user;

var express = require("express");

var router = express.Router();
router.post("/", function _callee(req, res) {
  var userId, accountUser;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = "64ad80b631825676a3fcec77";
          _context.next = 4;
          return regeneratorRuntime.awrap(user.findById(userId));

        case 4:
          accountUser = _context.sent;
          console.log(accountUser);
          res.status(200).json({
            accountUser: accountUser
          });
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.json({
            error: _context.t0
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;