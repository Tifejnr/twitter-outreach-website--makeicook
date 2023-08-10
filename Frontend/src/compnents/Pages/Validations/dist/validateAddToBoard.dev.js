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
  var boardsCollection = executionParams.boardsCollection;
  var boardIdsObj = executionParams.boardIdsObj;
  var emailInputs = executionParams.textAreaValue;
  var textareaInputs = executionParams.textAreaValue;
  var checkboxesArray = executionParams.checkboxesArray;
  var meansOfExceution = executionParams.meansOfExceution; //validating if it's username

  if (meansOfExceution == usernameMeans) {
    var response = (0, _usernamesValidation["default"])(textareaInputs);
    if (response.usernameValError) return response;
    var usernameSplitted = textareaInputs.split(",");
    usernameSplitted.map(function _callee(memberUsername) {
      var getMemberIdServer;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap((0, _getMemberIdByUsername["default"])(memberUsername, boardIdsObj));

            case 2:
              getMemberIdServer = _context.sent;
              console.log(getMemberIdServer);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  } //validating if it's email means entered


  if (meansOfExceution == emailMeans) {
    var _response = (0, _Input.validateInput)(emailInputs);

    if (_response.inputValError) return _response;
  }

  if (!(0, _Checkbox.isAnyCheckboxChecked)()) return {
    noCheckboxChecked: true
  };
  var boardDetailsObj = checkboxesArray.map(function (checkbox, index) {
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
  if (!boardDetailsObj) return "";
  var validationComplete = {
    boardDetailsObj: boardDetailsObj
  };
  return validationComplete;
}