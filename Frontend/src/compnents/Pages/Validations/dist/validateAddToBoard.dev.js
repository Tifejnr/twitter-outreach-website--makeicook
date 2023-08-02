"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateAddToBoard;

var _react = _interopRequireDefault(require("react"));

var _sliderValidation = require("../../../JS functions/Utilis/Validations/sliderValidation");

var _Checkbox = require("../../../JS functions/Utilis/Validations/Checkbox");

var _Input = require("../../../JS functions/Utilis/Validations/Input");

var _byName = require("../../../JS functions/Utilis/FindBoardId/byName");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function validateAddToBoard(executionParams) {
  var boardsCollection = executionParams.boardsCollection;
  var emailInputs = executionParams.textAreaValue;
  var textAreaRef = executionParams.textAreaRefEl;
  var timeIntervalValue = Number(executionParams.timeInterval);
  var timeIntervalRef = executionParams.timeIntervalRef;
  var checkboxesArray = executionParams.checkboxesArray;
  if (!(0, _Input.validateInput)(emailInputs, textAreaRef)) return false;
  var response = (0, _Input.validateInput)(emailInputs, textAreaRef);
  if (response.inputValError) return response;
  if (!response) return console.log("stop");
  if (!(0, _sliderValidation.timeIntervalSliderVal)(timeIntervalValue, timeIntervalRef)) return console.log("slider whaala"); // if (!isAnyCheckboxChecked()) return { noCheckboxChecked: true };

  var boardDetailsObj = checkboxesArray.map(function (checkbox, index) {
    if (!checkbox.checked) return false;
    var checkboxId = checkbox.id;
    var arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));
    var boardEl = document.getElementById("labelcheck".concat(arrayNoFromId));
    var boardName = boardEl.innerHTML;
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