"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateAddToBoard;

var _Checkbox = require("../../../JS functions/Utilis/Validations/Checkbox");

var _Input = require("../../../JS functions/Utilis/Validations/Input");

var _multiBoardsCheck = _interopRequireDefault(require("./memberIdSearch/multi-boards-check"));

var _boardIdName = _interopRequireDefault(require("./board-id-and-name/boardIdName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var emailMeans = "Email";
var usernameMeans = "Username - 100% Efficient";
var fullNameMeans = "Full name - 60% Efficient";
var nameAddingObjArray;

function validateAddToBoard(executionParams) {
  var boardIdsObj, emailInputs, textareaInputs, meansOfExceution, executionBtnClicked, usernamesIntoArray, fullNamesIntoArray, usernamesAtRemoved, isUsernameInput, boardDetailsObj, paramsForGettingMemberIds, response, _response, validationComplete;

  return regeneratorRuntime.async(function validateAddToBoard$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          boardIdsObj = executionParams.boardIdsObj;
          emailInputs = executionParams.textAreaValue;
          textareaInputs = executionParams.textAreaValue;
          meansOfExceution = executionParams.meansOfExceution;
          executionBtnClicked = executionParams.executionBtnClicked;
          usernamesIntoArray = textareaInputs.split(/\s*,\s*/);
          fullNamesIntoArray = textareaInputs.split(/\s*,\s*/);
          usernamesAtRemoved = usernamesIntoArray.map(function (username) {
            return username.slice(1);
          });
          isUsernameInput = usernamesIntoArray.some(function (input) {
            return input.startsWith("@");
          }); //validating checkbox to ensure at least one is checked

          if ((0, _Checkbox.isAnyCheckboxChecked)()) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", {
            noCheckboxChecked: true
          });

        case 11:
          //get checked boards id and their names for action in future
          boardDetailsObj = (0, _boardIdName["default"])(executionParams); //validating if it's username means or fullname means

          if (!(meansOfExceution == usernameMeans || meansOfExceution == fullNameMeans)) {
            _context.next = 24;
            break;
          }

          paramsForGettingMemberIds = {
            usernameMeans: usernameMeans,
            meansOfExceution: meansOfExceution,
            textareaInputs: textareaInputs,
            fullNamesIntoArray: fullNamesIntoArray,
            usernamesAtRemoved: usernamesAtRemoved,
            executionBtnClicked: executionBtnClicked,
            boardIdsObj: boardIdsObj,
            isUsernameInput: isUsernameInput,
            boardDetailsObj: boardDetailsObj
          };
          _context.next = 16;
          return regeneratorRuntime.awrap((0, _multiBoardsCheck["default"])(paramsForGettingMemberIds));

        case 16:
          response = _context.sent;

          if (!response.usernameValError) {
            _context.next = 19;
            break;
          }

          return _context.abrupt("return", response);

        case 19:
          if (!response.fullNameValError) {
            _context.next = 21;
            break;
          }

          return _context.abrupt("return", response);

        case 21:
          if (!response.errorNameAddingObjArray) {
            _context.next = 23;
            break;
          }

          return _context.abrupt("return", response);

        case 23:
          nameAddingObjArray = response.nameAddingObjArray;

        case 24:
          if (!(meansOfExceution == emailMeans)) {
            _context.next = 28;
            break;
          }

          _response = (0, _Input.validateInput)(emailInputs);

          if (!_response.inputValError) {
            _context.next = 28;
            break;
          }

          return _context.abrupt("return", _response);

        case 28:
          validationComplete = {
            boardDetailsObj: boardDetailsObj,
            nameAddingObjArray: nameAddingObjArray
          };
          return _context.abrupt("return", validationComplete);

        case 30:
        case "end":
          return _context.stop();
      }
    }
  });
}