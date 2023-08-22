"use strict";

var axios = require("axios"); //delete memeber from boards


function deleteMemberFromBoard(req, res) {
  var _req$body, boardId, memberId, boardDeleteUrl, response, data, deleteSucessfull, memberNotFoundError;

  return regeneratorRuntime.async(function deleteMemberFromBoard$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, boardId = _req$body.boardId, memberId = _req$body.memberId;
          boardDeleteUrl = "\n  https://api.trello.com/1/boards/".concat(boardId, "/members/").concat(memberId, "?key=").concat(key, "&token=").concat(token);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(axios["delete"](boardDeleteUrl));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.statusText);

        case 8:
          data = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(data);

        case 11:
          deleteSucessfull = _context.sent;

          if (!(deleteSucessfull == "OK")) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(200).json({
            deleteSucessfull: deleteSucessfull
          }));

        case 14:
          _context.next = 22;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](2);
          // console.error("Error:", error);
          memberNotFoundError = _context.t0.response.data;

          if (!(memberNotFoundError == "membership not found")) {
            _context.next = 21;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            memberNotFoundError: memberNotFoundError
          }));

        case 21:
          res.status(500).json({
            error: _context.t0
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 16]]);
}

exports.deleteMemberFromBoard = deleteMemberFromBoard;