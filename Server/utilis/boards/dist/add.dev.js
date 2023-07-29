"use strict";

var axios = require("axios");

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys;

var keysObjects = getKeys();
var key = keysObjects.CLIENT_SECRET_KEY;
var token = keysObjects.ACCESS_TOKEN_SECRET;

function addMemberToBoard(req, res) {
  var _req$body, email, boardId, memberAddingUrl, response, success;

  return regeneratorRuntime.async(function addMemberToBoard$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, boardId = _req$body.boardId;
          memberAddingUrl = "https://api.trello.com/1/boards/".concat(boardId, "/members?email=").concat(email, "&key=").concat(key, "&token=").concat(token);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(axios.put(memberAddingUrl));

        case 5:
          response = _context.sent;

          if (!(response.status === 200)) {
            _context.next = 10;
            break;
          }

          console.log("Member added successfully");
          success = true;
          return _context.abrupt("return", res.status(200).json({
            success: success
          }));

        case 10:
          _context.next = 17;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);
          console.error("Error:", _context.t0);
          console.error(_context.t0.message);
          res.status(400).json({
            error: _context.t0
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 12]]);
}

exports.addMemberToBoard = addMemberToBoard;