"use strict";

var _require = require("./getMembersId"),
    getMemberId = _require.getMemberId;

function findMemberId(req, res) {
  var allBoardsId, mainBoardsIdObj, allMembersDetails;
  return regeneratorRuntime.async(function findMemberId$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          allBoardsId = req.body.allBoardsId;
          mainBoardsIdObj = allBoardsId.boardsIdOnly; // Create an array to hold promises so that all promises are executed before moving on with the process

          _context2.next = 4;
          return regeneratorRuntime.awrap(Promise.all(mainBoardsIdObj.map(function _callee(board) {
            var boardId, paramToGetUsernameIds, memberDetails;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    boardId = board.boardId;
                    paramToGetUsernameIds = {
                      boardId: boardId,
                      key: key,
                      token: token
                    };
                    _context.next = 4;
                    return regeneratorRuntime.awrap(getMemberId(paramToGetUsernameIds));

                  case 4:
                    memberDetails = _context.sent;
                    return _context.abrupt("return", memberDetails);

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })));

        case 4:
          allMembersDetails = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            allMembersDetails: allMembersDetails
          }));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}

exports.findMemberId = findMemberId;