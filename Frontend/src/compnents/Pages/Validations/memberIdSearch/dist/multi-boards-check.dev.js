"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = memberIdSearch;

var _validateFullName = _interopRequireDefault(require("../full-name/validateFullName"));

var _usernamesValidation = _interopRequireDefault(require("../usernames/usernamesValidation"));

var _findByName = require("./findByName");

var _findByUsername = require("./findByUsername");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function memberIdSearch(paramsForGettingMemberIds) {
  var usernameMeans, meansOfExceution, whiteSpaceRemoved, fullNamesIntoArray, usernamesAtRemoved, whiteSpaceEndAndBeginningRemoved, isUsernameInput, allUserMemberDetail, executionBtnClicked, itemsIntoArray, nameAddingObjArray, errorNameAddingObjArray, response, _response, promises;

  return regeneratorRuntime.async(function memberIdSearch$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          usernameMeans = paramsForGettingMemberIds.usernameMeans;
          meansOfExceution = paramsForGettingMemberIds.meansOfExceution;
          whiteSpaceRemoved = paramsForGettingMemberIds.whiteSpaceRemoved;
          fullNamesIntoArray = paramsForGettingMemberIds.fullNamesIntoArray;
          usernamesAtRemoved = paramsForGettingMemberIds.usernamesAtRemoved;
          whiteSpaceEndAndBeginningRemoved = paramsForGettingMemberIds.whiteSpaceEndAndBeginningRemoved;
          isUsernameInput = paramsForGettingMemberIds.isUsernameInput;
          allUserMemberDetail = paramsForGettingMemberIds.allUserMemberDetail;
          executionBtnClicked = paramsForGettingMemberIds.executionBtnClicked;
          nameAddingObjArray = [], errorNameAddingObjArray = [];

          if (!(meansOfExceution == usernameMeans)) {
            _context2.next = 17;
            break;
          }

          response = (0, _usernamesValidation["default"])(whiteSpaceRemoved);

          if (!response.usernameValError) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", response);

        case 14:
          itemsIntoArray = usernamesAtRemoved;
          _context2.next = 21;
          break;

        case 17:
          _response = (0, _validateFullName["default"])(whiteSpaceEndAndBeginningRemoved);

          if (!_response.fullNameValError) {
            _context2.next = 20;
            break;
          }

          return _context2.abrupt("return", _response);

        case 20:
          itemsIntoArray = fullNamesIntoArray;

        case 21:
          // Create an array to hold promises so that all pomises are executed before moving on wt=ith the process
          promises = itemsIntoArray.map(function _callee(memberUsername) {
            var memberIdFound, memberId, nameAddingObj;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (isUsernameInput) {
                      memberIdFound = (0, _findByUsername.findMemberIdByUsername)(allUserMemberDetail, memberUsername);
                    } else {
                      memberIdFound = (0, _findByName.findMemberIdByName)(allUserMemberDetail, memberUsername);
                    }

                    if (memberIdFound) {
                      _context.next = 3;
                      break;
                    }

                    return _context.abrupt("return", errorNameAddingObjArray.push(memberUsername));

                  case 3:
                    memberId = memberIdFound.id;
                    nameAddingObj = {
                      memberId: memberId,
                      memberUsername: memberUsername,
                      isUsernameInput: isUsernameInput
                    };
                    nameAddingObjArray.push(nameAddingObj);

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

          if (!executionBtnClicked) {
            _context2.next = 24;
            break;
          }

          return _context2.abrupt("return", {
            stop: true
          });

        case 24:
          _context2.next = 26;
          return regeneratorRuntime.awrap(Promise.all(promises));

        case 26:
          if (!executionBtnClicked) {
            _context2.next = 28;
            break;
          }

          return _context2.abrupt("return", {
            stop: true
          });

        case 28:
          if (!(errorNameAddingObjArray.length > 0)) {
            _context2.next = 30;
            break;
          }

          return _context2.abrupt("return", {
            errorNameAddingObjArray: errorNameAddingObjArray
          });

        case 30:
          return _context2.abrupt("return", {
            nameAddingObjArray: nameAddingObjArray
          });

        case 31:
        case "end":
          return _context2.stop();
      }
    }
  });
}