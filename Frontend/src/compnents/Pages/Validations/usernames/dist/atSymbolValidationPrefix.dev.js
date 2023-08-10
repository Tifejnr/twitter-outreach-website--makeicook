"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = atSymbolValidationPrefix;
//anything can follow after the @ symbol
var regex = /^@[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\/\-\\]+$/;

function atSymbolValidationPrefix(input) {
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
    usernamesValidationSucess: true
  };
}