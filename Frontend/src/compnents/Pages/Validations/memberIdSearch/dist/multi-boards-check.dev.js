"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = memberIdSearch;

var _validateFullName = _interopRequireDefault(require("../full-name/validateFullName"));

var _usernamesValidation = _interopRequireDefault(require("../usernames/usernamesValidation"));

var _getMemberId = _interopRequireDefault(require("./getMemberId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function memberIdSearch(paramsForGettingMemberIds) {
  var usernameMeans, meansOfExceution, whiteSpaceRemoved, boardIdsObj, fullNamesIntoArray, usernamesAtRemoved, whiteSpaceEndAndBeginningRemoved, isUsernameInput, executionBtnClicked, checkedBoardsObj, action, itemsIntoArray, nameAddingObjArray, errorNameAddingObjArray, response, _response, promises;

  return regeneratorRuntime.async(function memberIdSearch$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          usernameMeans = paramsForGettingMemberIds.usernameMeans;
          meansOfExceution = paramsForGettingMemberIds.meansOfExceution;
          whiteSpaceRemoved = paramsForGettingMemberIds.whiteSpaceRemoved;
          boardIdsObj = paramsForGettingMemberIds.boardIdsObj;
          fullNamesIntoArray = paramsForGettingMemberIds.fullNamesIntoArray;
          usernamesAtRemoved = paramsForGettingMemberIds.usernamesAtRemoved;
          whiteSpaceEndAndBeginningRemoved = paramsForGettingMemberIds.whiteSpaceEndAndBeginningRemoved;
          isUsernameInput = paramsForGettingMemberIds.isUsernameInput;
          executionBtnClicked = paramsForGettingMemberIds.executionBtnClicked;
          checkedBoardsObj = paramsForGettingMemberIds.boardDetailsObj;
          action = paramsForGettingMemberIds.action;
          nameAddingObjArray = [], errorNameAddingObjArray = [];

          if (!(meansOfExceution == usernameMeans)) {
            _context2.next = 19;
            break;
          }

          response = (0, _usernamesValidation["default"])(whiteSpaceRemoved);

          if (!response.usernameValError) {
            _context2.next = 16;
            break;
          }

          return _context2.abrupt("return", response);

        case 16:
          itemsIntoArray = usernamesAtRemoved;
          _context2.next = 23;
          break;

        case 19:
          _response = (0, _validateFullName["default"])(whiteSpaceEndAndBeginningRemoved);

          if (!_response.fullNameValError) {
            _context2.next = 22;
            break;
          }

          return _context2.abrupt("return", _response);

        case 22:
          itemsIntoArray = fullNamesIntoArray;

        case 23:
          // Create an array to hold promises so that all pomises are executed before moving on wt=ith the process
          promises = itemsIntoArray.map(function _callee(memberUsername) {
            var memberDetailsForIdGetting, getMemberIdServer, memberIdFound, memberId, nameAddingObj;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    memberDetailsForIdGetting = {
                      memberUsername: memberUsername,
                      boardIdsObj: boardIdsObj,
                      isUsernameInput: isUsernameInput,
                      checkedBoardsObj: checkedBoardsObj,
                      action: action
                    };
                    _context.next = 3;
                    return regeneratorRuntime.awrap((0, _getMemberId["default"])(memberDetailsForIdGetting));

                  case 3:
                    getMemberIdServer = _context.sent;
                    _context.next = 6;
                    return regeneratorRuntime.awrap(getMemberIdServer);

                  case 6:
                    memberIdFound = _context.sent;

                    if (!executionBtnClicked) {
                      _context.next = 9;
                      break;
                    }

                    return _context.abrupt("return", ({
                      stop: true
                    }, console.log("stopped")));

                  case 9:
                    if (!memberIdFound.error) {
                      _context.next = 11;
                      break;
                    }

                    return _context.abrupt("return", errorNameAddingObjArray.push(memberUsername));

                  case 11:
                    memberId = memberIdFound.memberIdFound[0].memberId;
                    nameAddingObj = {
                      memberId: memberId,
                      memberUsername: memberUsername,
                      isUsernameInput: isUsernameInput
                    };
                    nameAddingObjArray.push(nameAddingObj);

                  case 14:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

          if (!executionBtnClicked) {
            _context2.next = 26;
            break;
          }

          return _context2.abrupt("return", {
            stop: true
          });

        case 26:
          _context2.next = 28;
          return regeneratorRuntime.awrap(Promise.all(promises));

        case 28:
          if (!executionBtnClicked) {
            _context2.next = 30;
            break;
          }

          return _context2.abrupt("return", {
            stop: true
          });

        case 30:
          if (!(errorNameAddingObjArray.length > 0)) {
            _context2.next = 32;
            break;
          }

          return _context2.abrupt("return", {
            errorNameAddingObjArray: errorNameAddingObjArray
          });

        case 32:
          return _context2.abrupt("return", {
            nameAddingObjArray: nameAddingObjArray
          });

        case 33:
        case "end":
          return _context2.stop();
      }
    }
  });
}