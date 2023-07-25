"use strict";

var axios = require("axios");

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys;

var keysObjects = getKeys();
var key = keysObjects.CLIENT_SECRET_KEY;
var token = keysObjects.ACCESS_TOKEN_SECRET;

function fetchAllBoards(req, res) {
  var boardsFetchingUrl, response, boards;
  return regeneratorRuntime.async(function fetchAllBoards$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          boardsFetchingUrl = "https://api.trello.com/1/members/me/boards?key=".concat(key, "&token=").concat(token);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(axios.get(boardsFetchingUrl));

        case 4:
          response = _context.sent;
          boards = response.data;
          res.status(200).json({
            boards: boards
          });
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          console.error("Error:", _context.t0);
          res.status(500).json({
            error: _context.t0
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
}

exports.fetchAllBoards = fetchAllBoards;