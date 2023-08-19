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
  var boardIdsObj, textareaInputs, meansOfExceution, executionBtnClicked, allUserMemberDetail, whiteSpaceRemoved, whiteSpaceEndAndBeginningRemoved, usernamesIntoArray, fullNamesIntoArray, usernamesAtRemoved, isUsernameInput, boardDetailsObj, paramsForGettingMemberIds, response, _response, validationComplete;

  return regeneratorRuntime.async(function validateAddToBoard$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          boardIdsObj = executionParams.boardIdsObj;
          textareaInputs = executionParams.textAreaValue;
          meansOfExceution = executionParams.meansOfExceution;
          executionBtnClicked = executionParams.executionBtnClicked;
          allUserMemberDetail = executionParams.allUserMemberDetail; //remove whitespaces from if it's username

          whiteSpaceRemoved = textareaInputs.replace(/ /g, ""); //remove whitespaces from  beginning and end of a string

          whiteSpaceEndAndBeginningRemoved = textareaInputs.replace(/ /g, "");
          usernamesIntoArray = whiteSpaceRemoved.split(/\s*,\s*/);
          fullNamesIntoArray = whiteSpaceEndAndBeginningRemoved.split(/\s*,\s*/);
          usernamesAtRemoved = usernamesIntoArray.map(function (username) {
            return username.slice(1);
          });
          isUsernameInput = usernamesIntoArray.some(function (input) {
            return input.startsWith("@");
          }); //validating checkbox to ensure at least one is checked

          if ((0, _Checkbox.isAnyCheckboxChecked)()) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", {
            noCheckboxChecked: true
          });

        case 13:
          //get checked boards id and their names for action in future
          boardDetailsObj = (0, _boardIdName["default"])(executionParams); //validating if it's username means or fullname means

          if (!(meansOfExceution == usernameMeans || meansOfExceution == fullNameMeans)) {
            _context.next = 26;
            break;
          }

          paramsForGettingMemberIds = {
            usernameMeans: usernameMeans,
            meansOfExceution: meansOfExceution,
            textareaInputs: textareaInputs,
            whiteSpaceRemoved: whiteSpaceRemoved,
            whiteSpaceEndAndBeginningRemoved: whiteSpaceEndAndBeginningRemoved,
            fullNamesIntoArray: fullNamesIntoArray,
            usernamesAtRemoved: usernamesAtRemoved,
            executionBtnClicked: executionBtnClicked,
            boardIdsObj: boardIdsObj,
            allUserMemberDetail: allUserMemberDetail,
            isUsernameInput: isUsernameInput,
            boardDetailsObj: boardDetailsObj
          };
          _context.next = 18;
          return regeneratorRuntime.awrap((0, _multiBoardsCheck["default"])(paramsForGettingMemberIds));

        case 18:
          response = _context.sent;

          if (!response.usernameValError) {
            _context.next = 21;
            break;
          }

          return _context.abrupt("return", response);

        case 21:
          if (!response.fullNameValError) {
            _context.next = 23;
            break;
          }

          return _context.abrupt("return", response);

        case 23:
          if (!response.errorNameAddingObjArray) {
            _context.next = 25;
            break;
          }

          return _context.abrupt("return", response);

        case 25:
          nameAddingObjArray = response.nameAddingObjArray;

        case 26:
          if (!(meansOfExceution == emailMeans)) {
            _context.next = 30;
            break;
          }

          _response = (0, _Input.validateInput)(whiteSpaceRemoved);

          if (!_response.inputValError) {
            _context.next = 30;
            break;
          }

          return _context.abrupt("return", _response);

        case 30:
          validationComplete = {
            boardDetailsObj: boardDetailsObj,
            nameAddingObjArray: nameAddingObjArray
          };
          return _context.abrupt("return", validationComplete);

        case 32:
        case "end":
          return _context.stop();
      }
    }
  });
}