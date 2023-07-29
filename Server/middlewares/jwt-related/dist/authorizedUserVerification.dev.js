"use strict";

var _require = require("../../models/users"),
    user = _require.user;

module.exports = function _callee(req, res, next) {
  var userId, accountUser, isAuthorized;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          //check if user has trello token stored or iv
          userId = userDetails._id;
          _context.next = 4;
          return regeneratorRuntime.awrap(user.findById(userId));

        case 4:
          accountUser = _context.sent;
          isAuthorized = accountUser.iv;
          userCredits = accountUser.credits;

          if (!(isAuthorized == "NA")) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(402).json({
            backToOauthPage: true
          }));

        case 9:
          next();
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(400).json({
            trelloTokenNotFoundError: _context.t0
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};