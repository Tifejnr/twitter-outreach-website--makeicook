"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setErrorTextarea = setErrorTextarea;
exports.setSliderError = setSliderError;
var errorColor = "#ff3860";

function setErrorTextarea(element, message) {
  var inputControl = element.parentElement;
  var errorDisplay = inputControl.querySelector(".error");
  errorDisplay.style.visibilty = "visible";
  errorDisplay.innerText = message;
  errorDisplay.style.color = errorColor;
  element.style.borderColor = errorColor;
}

function setSliderError(element, message) {
  var inputControl = element.parentElement;
  var errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  errorDisplay.style.color = errorColor;
  inputControl.style.borderColor = errorColor;
}