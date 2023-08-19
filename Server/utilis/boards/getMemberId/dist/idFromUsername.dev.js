"use strict";

var _require = require("./getMembersId"),
    getMemberId = _require.getMemberId;

var additionAction = "Addition";

function findMemberId(req, res) {
  var boardIdsObj, mainBoardsIdObj, boardId;
  return regeneratorRuntime.async(function findMemberId$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          boardIdsObj = req.body.boardIdsObj;
          mainBoardsIdObj = boardIdsObj.boardsIdOnly;
          boardId = board.boardId; //fetch workspace names for each boards

          mainBoardsIdObj.map(function _callee(board, index) {
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
          });
          return _context2.abrupt("return", res.status(200).json({
            allMembersDetails: mainBoardsIdObj
          }));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

exports.findMemberId = findMemberId;