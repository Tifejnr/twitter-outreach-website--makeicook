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
  var inputValError; // Check if input is empty or contains only whitespace

  var isEmpty = input.trim() === "";
  var isEmptyMessage = "Members' emails cannot be empty";
  inputValError = isEmptyMessage;
  if (isEmpty) return (0, _setError.setErrorTextarea)(textAreaRef, isEmptyMessage), {
    inputValError: inputValError
  }; //Check if all are separated by commas

  var inputsSplitted = input.split(",");
  var isValid = (0, _commaSeperationRegex.commaSeperationRegex)(input);
  var ifOneInputError = "You don't need a comma if it's one detail";
  inputValError = ifOneInputError;
  if (!isValid && inputsSplitted.length == 2) return (0, _setError.setErrorTextarea)(textAreaRef, ifOneInputError), {
    inputValError: inputValError
  };
  var commaErrorMultipleInputs = "Emails must be seperated by commas";
  inputValError = commaErrorMultipleInputs;
  if (!isValid) return (0, _setError.setErrorTextarea)(textAreaRef, commaErrorMultipleInputs), {
    inputValError: inputValError
  };
  var isEmailsValid = (0, _Email.validateEmail)(input);
  var oneOnlyInvalidMessage = "Invalid email";
  inputValError = oneOnlyInvalidMessage;
  if (!isEmailsValid && inputsSplitted.length == 1) return (0, _setError.setErrorTextarea)(textAreaRef, oneOnlyInvalidMessage), {
    inputValError: inputValError
  };
  var invalidEmailMessage = "At least one of the emails is Invalid";
  inputValError = invalidEmailMessage;
  if (!isEmailsValid) return (0, _setError.setErrorTextarea)(textAreaRef, invalidEmailMessage), {
    inputValError: inputValError
  };
  (0, _setSucess.setSuccess)(textAreaRef);
  return true;
}