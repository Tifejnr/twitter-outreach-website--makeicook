"use strict";

var axios = require("axios");

var _require = require("../../models/users"),
    user = _require.user;

var _require2 = require("../../middlewares/signature/generateSignature"),
    generateSignature = _require2.generateSignature;

function fetchAllBoards(req, res) {
  var userId, accountUser, sessionSignature, userUsername, boardsFetchingUrl, response, boards;
  return regeneratorRuntime.async(function fetchAllBoards$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = userDetails._id;
          _context.next = 3;
          return regeneratorRuntime.awrap(user.findById(userId));

        case 3:
          accountUser = _context.sent;
          sessionSignature = generateSignature(); //save user signature on every page load

          accountUser.sessionSignature = sessionSignature;
          userUsername = accountUser.username;
          _context.next = 9;
          return regeneratorRuntime.awrap(accountUser.save());

        case 9:
          //fetch all boards
          boardsFetchingUrl = "https://api.trello.com/1/members/me/boards?key=".concat(key, "&token=").concat(token);
          _context.prev = 10;
          _context.next = 13;
          return regeneratorRuntime.awrap(axios.get(boardsFetchingUrl));

        case 13:
          response = _context.sent;
          boards = response.data;
          res.status(200).json({
            boards: boards,
            sessionSignature: sessionSignature,
            userUsername: userUsername
          });
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](10);
          console.error("Error:", _context.t0);
          res.status(500).json({
            error: _context.t0
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[10, 18]]);
}

exports.fetchAllBoards = fetchAllBoards;