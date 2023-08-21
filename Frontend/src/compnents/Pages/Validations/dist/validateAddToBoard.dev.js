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
var nameAddingObjArray;

function validateAddToBoard(executionParams) {
  var boardIdsObj, textareaInputs, meansOfExceution, executionBtnClicked, allUserMemberDetail, whiteSpaceRemoved, _response, boardDetailsObj, paramsForGettingMemberIds, response, validationComplete;

  return regeneratorRuntime.async(function validateAddToBoard$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          boardIdsObj = executionParams.boardIdsObj;
          textareaInputs = executionParams.textAreaValue;
          meansOfExceution = executionParams.meansOfExceution;
          executionBtnClicked = executionParams.executionBtnClicked;
          allUserMemberDetail = executionParams.allUserMemberDetail; //remove whitespaces from if it's email

          whiteSpaceRemoved = textareaInputs.replace(/ /g, ""); //validating if it's email means

          if (!(meansOfExceution == emailMeans)) {
            _context.next = 10;
            break;
          }

          _response = (0, _Input.validateInput)(whiteSpaceRemoved);

          if (!_response.inputValError) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", _response);

        case 10:
          if ((0, _Checkbox.isAnyCheckboxChecked)()) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", {
            noCheckboxChecked: true
          });

        case 12:
          //get checked boards id and their names for action in future
          boardDetailsObj = (0, _boardIdName["default"])(executionParams);
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
          _context.next = 16;
          return regeneratorRuntime.awrap((0, _multiBoardsCheck["default"])(paramsForGettingMemberIds));

        case 16:
          response = _context.sent;
          nameAddingObjArray = response.nameAddingObjArray;
          validationComplete = {
            boardDetailsObj: boardDetailsObj,
            nameAddingObjArray: nameAddingObjArray
          };
          return _context.abrupt("return", validationComplete);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
}