"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setError;
var errorColor = "#ff3860";

function setError(element, message) {
  var inputControl = element.parentElement;
  var errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  errorDisplay.style.color = errorColor;
  element.style.borderColor = errorColor;
}