"use strict";

var _require = require("../../models/users"),
    user = _require.user;

module.exports = function _callee(req, res, next) {
  var accountUser, isAuthorized;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(user.findById(userDetails._id));

        case 3:
          accountUser = _context.sent;
          isAuthorized = accountUser.iv;

          if (!(isAuthorized == "NA")) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            backToOauthPage: true
          }));

        case 7:
          next();
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(400).json({
            unauthorizedToken: true
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};