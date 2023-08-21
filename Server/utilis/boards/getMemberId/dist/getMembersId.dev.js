"use strict";

var axios = require("axios");

function getMemberId(paramToGetUsernameIds) {
  var boardId, key, token, boardsDetailsUrl, response, boardMembersDetails;
  return regeneratorRuntime.async(function getMemberId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          boardId = paramToGetUsernameIds.boardId;
          key = paramToGetUsernameIds.key;
          token = paramToGetUsernameIds.token;
          boardsDetailsUrl = "https://api.trello.com/1/boards/".concat(boardId, "/members?key=").concat(key, "&token=").concat(token);
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(axios.get(boardsDetailsUrl));

        case 7:
          response = _context.sent;
          boardMembersDetails = response.data;
          boardMembersDetails.boardId = boardId;
          return _context.abrupt("return", boardMembersDetails);

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](4);
          console.error("Error:", _context.t0);
          return _context.abrupt("return", {
            boardDetailsFetchingError: _context.t0
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 13]]);
}

exports.getMemberId = getMemberId;