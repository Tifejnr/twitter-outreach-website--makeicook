"use strict";

var axios = require("axios");

var addingUrl;

function addMemberToBoard(req, res) {
  var _req$body, email, memberId, boardId, memberIdAddingUrl, memberEmailAddingUrl, response, success;

  return regeneratorRuntime.async(function addMemberToBoard$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, memberId = _req$body.memberId, boardId = _req$body.boardId;
          memberIdAddingUrl = "https://api.trello.com/1/boards/".concat(boardId, "/members/").concat(memberId, "?type={type}&key=").concat(key, "&token=").concat(token);
          memberEmailAddingUrl = "https://api.trello.com/1/boards/".concat(boardId, "/members?email=").concat(email, "&key=").concat(key, "&token=").concat(token);

          if (email) {
            addingUrl = memberEmailAddingUrl;
          }

          if (memberId) {
            addingUrl = memberIdAddingUrl;
          }

          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(axios.put(addingUrl));

        case 8:
          response = _context.sent;

          if (!(response.status === 200)) {
            _context.next = 13;
            break;
          }

          console.log("Member added successfully");
          success = true;
          return _context.abrupt("return", res.status(200).json({
            success: success
          }));

        case 13:
          _context.next = 20;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](5);
          console.error("Error:", _context.t0);
          console.error(_context.t0.message);
          res.status(400).json({
            error: _context.t0
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 15]]);
}

exports.addMemberToBoard = addMemberToBoard;