"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeIntervalSliderVal = timeIntervalSliderVal;

function timeIntervalSliderVal(value, timeIntervalEl) {
  var minValue = 1;
  var maxValue = 20;

  if (value < minValue) {
    var timeIntervalError = "Time interval cannot be ".concat(minValue - 1, " minute");
    setErrorTextarea(timeIntervalEl, timeIntervalError);
    return false;
  }

  if (value > maxValue) {
    var _timeIntervalError = "Time interval cannot be more than ".concat(maxValue, " minutes");

    setErrorTextarea(timeIntervalEl, _timeIntervalError);
    return false;
  }

  setSuccessTextarea(timeIntervalEl);
  return true;
}