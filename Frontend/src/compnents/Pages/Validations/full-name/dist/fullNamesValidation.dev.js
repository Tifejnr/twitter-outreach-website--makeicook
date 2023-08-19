"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fullNamesValidation;
var regex = /^[a-zA-Z\d\s,]+$/g;

function fullNamesValidation(input) {
  var invalidDetailsIndexArray = []; //convert to an array []

  var inputs = input.split(/\s*,\s*/);
  inputs.forEach(function (input, index) {
    //push to array of failed validation if invalid
    if (!regex.test(input)) {
      invalidDetailsIndexArray.push(index);
    }
  });
  if (invalidDetailsIndexArray.length > 0) return {
    invalidDetailsIndexArray: invalidDetailsIndexArray
  };
  return {
    usernamesValidationSucess: true
  };
}