"use strict";

var axios = require("axios");

function getMemberId(paramToGetUsernameIds) {
  var boardId, memberUsername, key, token, boardsDetailsUrl, response, boardMembersDetails, desiredMember, memberId;
  return regeneratorRuntime.async(function getMemberId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          boardId = paramToGetUsernameIds.boardId;
          memberUsername = paramToGetUsernameIds.memberUsername;
          key = paramToGetUsernameIds.key;
          token = paramToGetUsernameIds.token;
          boardsDetailsUrl = "https://api.trello.com/1/boards/".concat(boardId, "/members?key=").concat(key, "&token=").concat(token);
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(axios.get(boardsDetailsUrl));

        case 8:
          response = _context.sent;
          boardMembersDetails = response.data; // Search for the desired member by username

          desiredMember = boardMembersDetails.find(function (member) {
            return member.username === memberUsername;
          });

          if (desiredMember) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return");

        case 13:
          memberId = desiredMember.id;
          return _context.abrupt("return", {
            memberId: memberId
          });

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](5);
          console.error("Error:", _context.t0);
          return _context.abrupt("return", {
            boardDetailsFetchingError: _context.t0
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 17]]);
}

exports.getMemberId = getMemberId;