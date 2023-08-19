"use strict";

var axios = require("axios");

function getMemberId(paramToGetUsernameIds) {
  var boardId, memberUsername, key, token, isUsernameInput, desiredMember, boardsDetailsUrl, response, boardMembersDetails;
  return regeneratorRuntime.async(function getMemberId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          boardId = paramToGetUsernameIds.boardId;
          memberUsername = paramToGetUsernameIds.memberUsername;
          key = paramToGetUsernameIds.key;
          token = paramToGetUsernameIds.token;
          isUsernameInput = paramToGetUsernameIds.isUsernameInput;
          boardsDetailsUrl = "https://api.trello.com/1/boards/".concat(boardId, "/members?key=").concat(key, "&token=").concat(token);
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(axios.get(boardsDetailsUrl));

        case 9:
          response = _context.sent;
          boardMembersDetails = response.data; // if (isUsernameInput) {
          //   // Search for the desired member by username
          //   desiredMember = boardMembersDetails.find(
          //     (member) => member.username === memberUsername
          //   );
          // } else {
          //   desiredMember = boardMembersDetails.find(
          //     (member) => member.fullName === memberUsername
          //   );
          // }
          // if (!desiredMember) return;
          // const memberId = desiredMember.id;

          return _context.abrupt("return", {
            boardMembersDetails: boardMembersDetails
          });

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](6);
          console.error("Error:", _context.t0);
          return _context.abrupt("return", {
            boardDetailsFetchingError: _context.t0
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 14]]);
}

exports.getMemberId = getMemberId;