"use strict";

var _require = require("./getMembersId"),
    getMemberId = _require.getMemberId;

var additionAction = "Addition";

function findMemberId(req, res) {
  var _req$body, memberUsername, isUsernameInput, boardIdsObj, checkedBoardsObj, action, noOfAttemptsArray, memberIdFound, boardObjToSearch, mainBoardsIdObj, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, board, boardId, paramToGetUsernameIds, isMemberPresent;

  return regeneratorRuntime.async(function findMemberId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, memberUsername = _req$body.memberUsername, isUsernameInput = _req$body.isUsernameInput, boardIdsObj = _req$body.boardIdsObj, checkedBoardsObj = _req$body.checkedBoardsObj, action = _req$body.action;
          noOfAttemptsArray = [], memberIdFound = [];
          mainBoardsIdObj = boardIdsObj.boardsIdOnly;

          if (action == additionAction) {
            boardObjToSearch = mainBoardsIdObj;
          } else {
            boardObjToSearch = checkedBoardsObj;
          }

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 7;
          _iterator = boardObjToSearch[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 30;
            break;
          }

          board = _step.value;
          noOfAttemptsArray.push(1);

          if (!(memberIdFound.length > 0)) {
            _context.next = 15;
            break;
          }

          console.log("already found it,", noOfAttemptsArray.length);
          return _context.abrupt("break", 30);

        case 15:
          boardId = board.boardId;
          paramToGetUsernameIds = {
            boardId: boardId,
            memberUsername: memberUsername,
            isUsernameInput: isUsernameInput,
            key: key,
            token: token
          };
          _context.prev = 17;
          _context.next = 20;
          return regeneratorRuntime.awrap(getMemberId(paramToGetUsernameIds));

        case 20:
          isMemberPresent = _context.sent;

          if (isMemberPresent && isMemberPresent.memberId) {
            memberIdFound.push(isMemberPresent);
          }

          _context.next = 27;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](17);
          console.log("error", _context.t0);

        case 27:
          _iteratorNormalCompletion = true;
          _context.next = 9;
          break;

        case 30:
          _context.next = 36;
          break;

        case 32:
          _context.prev = 32;
          _context.t1 = _context["catch"](7);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 36:
          _context.prev = 36;
          _context.prev = 37;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 39:
          _context.prev = 39;

          if (!_didIteratorError) {
            _context.next = 42;
            break;
          }

          throw _iteratorError;

        case 42:
          return _context.finish(39);

        case 43:
          return _context.finish(36);

        case 44:
          if (!(memberIdFound.length > 0)) {
            _context.next = 46;
            break;
          }

          return _context.abrupt("return", res.status(200).json({
            memberIdFound: memberIdFound
          }));

        case 46:
          if (!(noOfAttemptsArray.length === mainBoardsIdObj.length && memberIdFound.length === 0)) {
            _context.next = 48;
            break;
          }

          return _context.abrupt("return", res.status(402).json({
            usernameIdNotFound: true
          }));

        case 48:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 32, 36, 44], [17, 24], [37,, 39, 43]]);
}

exports.findMemberId = findMemberId;