"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = noWhitespaceValidation;
var noWhiteSpaceRegex = /^\S+$/;

function noWhitespaceValidation(input) {
  // Use a regular expression to check for the absence of whitespace characters
  var whiteSpacesPresentArray = [];
  var inputs = input.split(/\s*,\s*/);
  console.log(inputs);
  inputs.forEach(function (input, index) {
    //push to array of failed validation if invalid
    if (!noWhiteSpaceRegex.test(input)) {
      console.log("yeah");
      whiteSpacesPresentArray.push(index);
    }
  });
  if (whiteSpacesPresentArray.length > 0) return {
    whiteSpacesPresentArray: whiteSpacesPresentArray
  };
  return {
    whiteSpaceValidationSucess: true
  };
}