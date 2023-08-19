"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateEmail;
//validates all email inputs in  a string
// function validateEmail(email) {
//   const emailPattern = /^\s*\w+@\w+\.\w+(\s*,\s*\w+@\w+\.\w+)*\s*$/;
//   return emailPattern.test(email);
// }
var regex = /^[\w\.-]+@[\w\.-]+\.\w+$/;

function validateEmail(input) {
  var invalidDetailsIndexArray = [];
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
    emailValidationSucess: true
  };
}