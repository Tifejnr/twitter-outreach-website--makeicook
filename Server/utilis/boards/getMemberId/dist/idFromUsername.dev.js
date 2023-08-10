"use strict";

var _require = require("./getMembersId"),
    getMemberId = _require.getMemberId;

function findMemberId(req, res) {
  var memberIdFound, _req$body, memberUsername, boardIdsObj, mainBoardsIdObj, promises;

  return regeneratorRuntime.async(function findMemberId$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          memberIdFound = [];
          _req$body = req.body, memberUsername = _req$body.memberUsername, boardIdsObj = _req$body.boardIdsObj;
          console.log(memberUsername);
          mainBoardsIdObj = boardIdsObj.boardsIdOnly; // Create an array to hold promises

          promises = mainBoardsIdObj.map(function _callee(board, index) {
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

                    if (isMemberPresent && isMemberPresent.memberId) {
                      memberIdFound.push(isMemberPresent);
                    }

                    _context.next = 12;
                    break;

                  case 9:
                    _context.prev = 9;
                    _context.t0 = _context["catch"](2);
                    console.log("error", _context.t0);

                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[2, 9]]);
          }); // Wait for all promises to resolve

          _context2.next = 7;
          return regeneratorRuntime.awrap(Promise.all(promises));

        case 7:
          console.log(memberIdFound.length);

          if (!(memberIdFound.length > 0)) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(200).json({
            memberIdFound: memberIdFound
          }));

        case 10:
          return _context2.abrupt("return", res.status(402).json({
            usernameIdNotFound: true
          }));

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}

exports.findMemberId = findMemberId;