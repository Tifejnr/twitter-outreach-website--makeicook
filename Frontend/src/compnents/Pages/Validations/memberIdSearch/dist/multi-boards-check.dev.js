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
  var usernameMeans, meansOfExceution, textareaInputs, boardIdsObj, fullNamesIntoArray, usernamesAtRemoved, isUsernameInput, executionBtnClicked, checkedBoardsObj, action, itemsIntoArray, nameAddingObjArray, errorNameAddingObjArray, response, _response, promises;

  return regeneratorRuntime.async(function memberIdSearch$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          usernameMeans = paramsForGettingMemberIds.usernameMeans;
          meansOfExceution = paramsForGettingMemberIds.meansOfExceution;
          textareaInputs = paramsForGettingMemberIds.textareaInputs;
          boardIdsObj = paramsForGettingMemberIds.boardIdsObj;
          fullNamesIntoArray = paramsForGettingMemberIds.fullNamesIntoArray;
          usernamesAtRemoved = paramsForGettingMemberIds.usernamesAtRemoved;
          isUsernameInput = paramsForGettingMemberIds.isUsernameInput;
          executionBtnClicked = paramsForGettingMemberIds.executionBtnClicked;
          checkedBoardsObj = paramsForGettingMemberIds.boardDetailsObj;
          action = paramsForGettingMemberIds.action;
          nameAddingObjArray = [], errorNameAddingObjArray = [];

          if (!(meansOfExceution == usernameMeans)) {
            _context2.next = 18;
            break;
          }

          response = (0, _usernamesValidation["default"])(textareaInputs);

          if (!response.usernameValError) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", response);

        case 15:
          itemsIntoArray = usernamesAtRemoved;
          _context2.next = 22;
          break;

        case 18:
          _response = (0, _validateFullName["default"])(textareaInputs);

          if (!_response.fullNameValError) {
            _context2.next = 21;
            break;
          }

          return _context2.abrupt("return", _response);

        case 21:
          itemsIntoArray = fullNamesIntoArray;

        case 22:
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
            _context2.next = 25;
            break;
          }

          return _context2.abrupt("return", {
            stop: true
          });

        case 25:
          _context2.next = 27;
          return regeneratorRuntime.awrap(Promise.all(promises));

        case 27:
          if (!executionBtnClicked) {
            _context2.next = 29;
            break;
          }

          return _context2.abrupt("return", {
            stop: true
          });

        case 29:
          if (!(errorNameAddingObjArray.length > 0)) {
            _context2.next = 31;
            break;
          }

          return _context2.abrupt("return", {
            errorNameAddingObjArray: errorNameAddingObjArray
          });

        case 31:
          return _context2.abrupt("return", {
            nameAddingObjArray: nameAddingObjArray
          });

        case 32:
        case "end":
          return _context2.stop();
      }
    }
  });
}