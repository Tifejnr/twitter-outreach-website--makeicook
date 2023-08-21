"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateAddToBoard;

var _Checkbox = require("../../../JS functions/Utilis/Validations/Checkbox");

var _Input = require("../../../JS functions/Utilis/Validations/Input");

var _multiBoardsCheck = _interopRequireDefault(require("./memberIdSearch/multi-boards-check"));

var _boardIdName = _interopRequireDefault(require("./board-id-and-name/boardIdName"));

var _findMemberId = _interopRequireDefault(require("./memberIdSearch/findMemberId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var emailMeans = "Email";
var nameAddingObjArray;

function validateAddToBoard(executionParams) {
  var boardIdsObj, textareaInputs, meansOfExceution, executionBtnClicked, allUserMemberDetail, memberCheckboxesArray, whiteSpaceRemoved, _response, boardDetailsObj, paramsForGettingMemberIds, response, validationComplete;

  return regeneratorRuntime.async(function validateAddToBoard$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          boardIdsObj = executionParams.boardIdsObj;
          textareaInputs = executionParams.textAreaValue;
          meansOfExceution = executionParams.meansOfExceution;
          executionBtnClicked = executionParams.executionBtnClicked;
          allUserMemberDetail = executionParams.allUserMemberDetail;
          memberCheckboxesArray = executionParams.memberCheckboxesArray; //remove whitespaces from if it's email

          whiteSpaceRemoved = textareaInputs.replace(/ /g, ""); //validating if it's email means

          if (!(meansOfExceution == emailMeans)) {
            _context.next = 11;
            break;
          }

          _response = (0, _Input.validateInput)(whiteSpaceRemoved);

          if (!_response.inputValError) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", _response);

        case 11:
          if ((0, _Checkbox.isAnyCheckboxChecked)()) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", {
            noCheckboxChecked: true
          });

        case 13:
          //get checked boards id and their names for action in future
          boardDetailsObj = (0, _boardIdName["default"])(executionParams);
          paramsForGettingMemberIds = {
            meansOfExceution: meansOfExceution,
            textareaInputs: textareaInputs,
            whiteSpaceRemoved: whiteSpaceRemoved,
            boardIdsObj: boardIdsObj,
            allUserMemberDetail: allUserMemberDetail,
            boardDetailsObj: boardDetailsObj,
            memberCheckboxesArray: memberCheckboxesArray
          };
          response = (0, _findMemberId["default"])(paramsForGettingMemberIds);
          console.log(response);
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