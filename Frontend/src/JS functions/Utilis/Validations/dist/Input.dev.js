"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateInput = validateInput;

var _Email = require("./Email");

var _commaSeperationRegex = require("./commaSeperationRegex");

var _setError = require("./setError");

var _setSucess = require("./setSucess");

function validateInput(input, textAreaRef) {
  // Check if input is empty or contains only whitespace
  var isEmpty = input.trim() === "";
  var isEmptyMessage = "Members' emails cannot be empty";
  if (isEmpty) return (0, _setError.setErrorTextarea)(textAreaRef, isEmptyMessage); //Check if all are separated by commas

  var inputsSplitted = input.split(",");
  var isValid = (0, _commaSeperationRegex.commaSeperationRegex)(input);
  var commaErrorMultipleInputs = "Emails must be seperated by commas";
  var ifOneInputError = "You don't need a comma if it's one detail";
  if (!isValid && inputsSplitted.length == 2) return (0, _setError.setErrorTextarea)(textAreaRef, ifOneInputError);
  if (!isValid) return (0, _setError.setErrorTextarea)(textAreaRef, commaErrorMultipleInputs);
  var isEmailsValid = (0, _Email.validateEmail)(input);
  var invalidEmailMessage = "At least one of the emails is Invalid";
  var oneOnlyInvalidMessage = "Invalid email";
  if (!isEmailsValid && inputsSplitted.length == 1) return (0, _setError.setErrorTextarea)(textAreaRef, oneOnlyInvalidMessage);
  if (!isEmailsValid) return (0, _setError.setErrorTextarea)(textAreaRef, invalidEmailMessage);
  (0, _setSucess.setSuccess)(textAreaRef);
  return true;
}