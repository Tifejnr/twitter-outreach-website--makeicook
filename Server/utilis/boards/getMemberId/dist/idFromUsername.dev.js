"use strict";

var _require = require("./getMembersId"),
    getMemberId = _require.getMemberId;

function findMemberId(req, res) {
  var _req$body = req.body,
      memberUsername = _req$body.memberUsername,
      boardIdsObj = _req$body.boardIdsObj;
  var mainBoardsIdObj = boardIdsObj.boardsIdOnly;
  var memberId = mainBoardsIdObj.map(function _callee(board, index) {
    var boardId, paramToGetUsernameIds, isMemberPresent;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            boardId = board.boardId;
            paramToGetUsernameIds = {
              boardId: boardId,
              memberUsername: memberUsername,
              key: key,
              token: token
            };
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap(getMemberId(paramToGetUsernameIds));

          case 5:
            isMemberPresent = _context.sent;

            if (!isMemberPresent.memberId) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", {
              isMemberPresent: isMemberPresent
            });

          case 8:
            return _context.abrupt("return", false);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 11]]);
  });
  console.log(memberId); // let memberUsernameFound = [];
  // const inputs = input.split(/\s*,\s*/);
  // mainBoardsIdObj.forEach(async(board, index) => {
  //   const boardId = board.boardId;
  //   //push to array of failed validation if invalid
  //   if (!regex.test(input)) {
  //     memberUsernameFound.push(index);
  //   }
  // });
  // if (memberUsernameFound.length > 0) return { memberUsernameFound };
  // return { usernamesValidationSucess: true };
}

exports.findMemberId = findMemberId;