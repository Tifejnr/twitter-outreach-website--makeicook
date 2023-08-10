"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateAddToBoard;

var _Checkbox = require("../../../JS functions/Utilis/Validations/Checkbox");

var _Input = require("../../../JS functions/Utilis/Validations/Input");

var _byName = require("../../../JS functions/Utilis/FindBoardId/byName");

var _usernamesValidation = _interopRequireDefault(require("./usernames/usernamesValidation"));

var _getMemberIdByUsername = _interopRequireDefault(require("./usernames/getMemberIdByUsername"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var emailMeans = "Email";
var usernameMeans = "Username";
var fullNameMeans = "Fullname";

function validateAddToBoard(executionParams) {
  var boardsCollection, boardIdsObj, emailInputs, textareaInputs, checkboxesArray, meansOfExceution, usernamesIntoArray, usernamesAtRemoved, usernameAddingObjArray, response, usernameSplitted, promises, _response, boardDetailsObj, validationComplete;

  return regeneratorRuntime.async(function validateAddToBoard$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          boardsCollection = executionParams.boardsCollection;
          boardIdsObj = executionParams.boardIdsObj;
          emailInputs = executionParams.textAreaValue;
          textareaInputs = executionParams.textAreaValue;
          checkboxesArray = executionParams.checkboxesArray;
          meansOfExceution = executionParams.meansOfExceution;
          usernamesIntoArray = textareaInputs.split(/\s*,\s*/);
          usernamesAtRemoved = usernamesIntoArray.map(function (username) {
            return username.slice(1);
          }); //validating checkbox

          if ((0, _Checkbox.isAnyCheckboxChecked)()) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", {
            noCheckboxChecked: true
          });

        case 10:
          usernameAddingObjArray = []; //validating if it's username

          if (!(meansOfExceution == usernameMeans)) {
            _context2.next = 20;
            break;
          }

          response = (0, _usernamesValidation["default"])(textareaInputs);

          if (!response.usernameValError) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", response);

        case 15:
          usernameSplitted = textareaInputs.split(",");
          usernameAddingObjArray = []; // Create an array to hold promises

          promises = usernamesAtRemoved.map(function _callee(memberUsername) {
            var getMemberIdServer, memberIdFound, memberId, usernameAddingObj;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    console.log(memberUsername);
                    _context.next = 3;
                    return regeneratorRuntime.awrap((0, _getMemberIdByUsername["default"])(memberUsername, boardIdsObj));

                  case 3:
                    getMemberIdServer = _context.sent;
                    _context.next = 6;
                    return regeneratorRuntime.awrap(getMemberIdServer);

                  case 6:
                    memberIdFound = _context.sent;

                    if (!memberIdFound.error) {
                      _context.next = 9;
                      break;
                    }

                    return _context.abrupt("return", console.log("member not found"));

                  case 9:
                    memberId = memberIdFound.memberIdFound[0].memberId;
                    usernameAddingObj = {
                      memberId: memberId,
                      memberUsername: memberUsername
                    };
                    usernameAddingObjArray.push(usernameAddingObj);

                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          _context2.next = 20;
          return regeneratorRuntime.awrap(Promise.all(promises));

        case 20:
          if (!(meansOfExceution == emailMeans)) {
            _context2.next = 24;
            break;
          }

          _response = (0, _Input.validateInput)(emailInputs);

          if (!_response.inputValError) {
            _context2.next = 24;
            break;
          }

          return _context2.abrupt("return", _response);

        case 24:
          boardDetailsObj = checkboxesArray.map(function (checkbox, index) {
            if (!checkbox.checked) return false;
            var checkboxId = checkbox.id;
            var arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));
            var boardEl = document.getElementById("labelcheck".concat(arrayNoFromId));
            var boardName = boardEl.textContent;
            var foundBoard = (0, _byName.findBoardIdByName)(boardsCollection, boardName);
            if (!foundBoard) return console.log("board not found");
            var boardId = foundBoard.id;
            var neededObj = {
              boardId: boardId,
              boardName: boardName
            };
            return neededObj;
          });

          if (boardDetailsObj) {
            _context2.next = 27;
            break;
          }

          return _context2.abrupt("return", "");

        case 27:
          validationComplete = {
            boardDetailsObj: boardDetailsObj,
            usernameAddingObjArray: usernameAddingObjArray
          };
          return _context2.abrupt("return", validationComplete);

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  });
}