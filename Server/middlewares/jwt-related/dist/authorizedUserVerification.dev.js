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
          // const userId = userDetails._id;
          userId = "64ad80b631825676a3fcec77";
          _context.next = 4;
          return regeneratorRuntime.awrap(user.findById(userId));

        case 4:
          accountUser = _context.sent;
          isAuthorized = accountUser.iv;

          if (!(isAuthorized == "NA")) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(402).json({
            backToOauthPage: true
          }));

        case 8:
          next();
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(400).json({
            trelloTokenNotFoundError: _context.t0
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};