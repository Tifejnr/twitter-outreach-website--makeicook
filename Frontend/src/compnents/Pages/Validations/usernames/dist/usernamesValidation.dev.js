"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = usernamesValidation;

var _commaSeperationRegex = require("../../../../JS functions/Utilis/Validations/commaSeperationRegex");

var _atSymbolValidationPrefix = _interopRequireDefault(require("./atSymbolValidationPrefix"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function usernamesValidation(inputValue) {
  // Check if input is empty or contains only whitespace
  var input = inputValue.trim();
  var isEmpty = input === "";
  var isEmptyMessage = "Members' usernames cannot be empty";
  if (isEmpty) return {
    usernameValError: isEmptyMessage
  }; //Check if all are separated by commas

  var inputsSplitted = input.split(/\s*,\s*/);
  var isValid = (0, _commaSeperationRegex.commaSeperationRegex)(input);
  var ifOneInputError = "You don't need a comma if it's one username";
  if (!isValid && inputsSplitted.length == 2) return {
    usernameValError: ifOneInputError
  };
  var commaErrorMultipleInputs = "Usernames must be seperated by commas";
  if (!isValid) return {
    usernameValError: commaErrorMultipleInputs
  };
  var areUsernamesValid = (0, _atSymbolValidationPrefix["default"])(input);
  if (!areUsernamesValid.invalidDetailsIndexArray) return true;
  var oneOnlyInvalidMessage = "Username must start with \"@\" symbol";
  if (areUsernamesValid.invalidDetailsIndexArray && inputsSplitted.length == 1) return {
    usernameValError: oneOnlyInvalidMessage
  }; //add 1 to all the indexes to make users know it's on no 1 instead if 0

  var oneAddedToAllIndexes = areUsernamesValid.invalidDetailsIndexArray.map(function (value) {
    return value + 1;
  });
  var invalidIndexesJoined = oneAddedToAllIndexes.join(", ");
  var invalidUsernamesMessageSingular = "Username ".concat(invalidIndexesJoined, " must start with \"@\" symbol");
  var invalidUsernamesMessagePlural = "Usernames ".concat(invalidIndexesJoined, " must start with \"@\" symbol");
  if (areUsernamesValid.invalidDetailsIndexArray && inputsSplitted.length > 1 && oneAddedToAllIndexes.length === 1) return {
    usernameValError: invalidUsernamesMessageSingular
  };
  if (areUsernamesValid.invalidDetailsIndexArray && inputsSplitted.length > 1 && oneAddedToAllIndexes.length > 1) return {
    usernameValError: invalidUsernamesMessagePlural
  };
}