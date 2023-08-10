"use strict";

var _require = require("./getMembersId"),
    getMemberId = _require.getMemberId;

function findMemberId(req, res) {
  var memberIdFound = [];
  var _req$body = req.body,
      memberUsername = _req$body.memberUsername,
      boardIdsObj = _req$body.boardIdsObj; //to remove @ symbol from

  var desiredUsername = memberUsername.slice(1);
  var mainBoardsIdObj = boardIdsObj.boardsIdOnly;
  var memberId = mainBoardsIdObj.forEach(function _callee(board, index) {
    var boardId, paramToGetUsernameIds, isMemberPresent;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            boardId = board.boardId;
            paramToGetUsernameIds = {
              boardId: boardId,
              desiredUsername: desiredUsername,
              key: key,
              token: token
            };
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap(getMemberId(paramToGetUsernameIds));

          case 5:
            isMemberPresent = _context.sent;

            if (isMemberPresent) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", console.log("username not found"));

          case 8:
            if (!isMemberPresent.memberId) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", memberIdFound.push(isMemberPresent.memberId));

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 12]]);
  });
  if (memberIdFound.length > 0) return res.status(200).json({
    memberIdFound: memberIdFound
  });
  return res.status(400).json({
    usernameNotFound: true
  });
}

exports.findMemberId = findMemberId;