"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSliderSuccess = setSliderSuccess;
exports.setSuccess = void 0;
var successColor = "#09c372";

var setSuccess = function setSuccess(element) {
  var inputControl = element.parentElement;
  var errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  element.style.borderColor = successColor;
};

exports.setSuccess = setSuccess;

function setSliderSuccess(element) {
  var inputControl = element.parentElement;
  var errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.style.borderColor = successColor;
}