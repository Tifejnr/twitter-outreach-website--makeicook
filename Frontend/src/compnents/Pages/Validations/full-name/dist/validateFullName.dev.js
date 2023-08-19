"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateFullName;

var _fullNamesValidation = _interopRequireDefault(require("./fullNamesValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function validateFullName(input) {
  // Check if input is empty or contains only whitespace
  var isEmpty = input.trim() === "";
  var isEmptyMessage = "Members' full names cannot be empty";
  if (isEmpty) return {
    fullNameValError: isEmptyMessage
  };
  var inputsSplitted = input.split(",");
  var areFullnamesValid = (0, _fullNamesValidation["default"])(input);
  if (!areFullnamesValid.invalidDetailsIndexArray) return true;
  var oneOnlyInvalidMessage = "Full name is invalid";
  if (areFullnamesValid.invalidDetailsIndexArray && inputsSplitted.length == 1) return {
    fullnameValError: oneOnlyInvalidMessage
  }; //add 1 to all the indexes to make users know it's on no 1 instead if 0

  var oneAddedToAllIndexes = areFullnamesValid.invalidDetailsIndexArray.map(function (value) {
    return value + 1;
  });
  var invalidIndexesJoined = oneAddedToAllIndexes.join(", ");
  var invalidFullnamesMessage = "Full names ".concat(invalidIndexesJoined, " is invalid");
  if (areFullnamesValid.invalidDetailsIndexArray && inputsSplitted.length > 1) return {
    fullnameValError: invalidFullnamesMessage
  };
}