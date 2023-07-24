"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setSuccess;
var successColor = "#09c372";

function setSuccess(element) {
  var inputControl = element.parentElement;
  var errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  element.style.borderColor = successColor;
}