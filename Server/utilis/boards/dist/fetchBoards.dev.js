"use strict";

var axios = require("axios");

var _require = require("../../models/users"),
    user = _require.user;

var _require2 = require("../../middlewares/signature/generateSignature"),
    generateSignature = _require2.generateSignature; // const { getKeys } = require("../../envKeys/allKeys");
// const keysObjects = getKeys();
// const key = keysObjects.CLIENT_SECRET_KEY;
// const token = keysObjects.ACCESS_TOKEN_SECRET;


function fetchAllBoards(req, res) {
  var userId, accountUser, sessionSignature, boardsFetchingUrl, response, boards;
  return regeneratorRuntime.async(function fetchAllBoards$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = userDetails._id; // const userId = "64ad80b631825676a3fcec77";

          _context.next = 3;
          return regeneratorRuntime.awrap(user.findById(userId));

        case 3:
          accountUser = _context.sent;
          sessionSignature = generateSignature(); //save user signature on every page load

          accountUser.sessionSignature = sessionSignature;
          _context.next = 8;
          return regeneratorRuntime.awrap(accountUser.save());

        case 8:
          //fetch all boards
          boardsFetchingUrl = "https://api.trello.com/1/members/me/boards?key=".concat(key, "&token=").concat(token);
          _context.prev = 9;
          _context.next = 12;
          return regeneratorRuntime.awrap(axios.get(boardsFetchingUrl));

        case 12:
          response = _context.sent;
          boards = response.data;
          res.status(200).json({
            boards: boards,
            sessionSignature: sessionSignature
          });
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](9);
          console.error("Error:", _context.t0);
          res.status(500).json({
            error: _context.t0
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[9, 17]]);
}

exports.fetchAllBoards = fetchAllBoards;