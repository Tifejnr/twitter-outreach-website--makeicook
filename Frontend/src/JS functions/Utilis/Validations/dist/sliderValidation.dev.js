"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeIntervalSliderVal = timeIntervalSliderVal;

var _setError = require("./setError");

var _setSucess = require("./setSucess");

function timeIntervalSliderVal(value, timeIntervalEl) {
  var minValue = 0;
  var maxValue = 20;

  if (value < minValue) {
    var timeIntervalError = "Time interval cannot be ".concat(minValue, " seconds");
    (0, _setError.setSliderError)(timeIntervalEl, timeIntervalError);
    return false;
  }

  if (value > maxValue) {
    var _timeIntervalError = "Time interval cannot be more than ".concat(maxValue, " seconds");

    (0, _setError.setSliderError)(timeIntervalEl, _timeIntervalError);
    return false;
  }

  (0, _setSucess.setSliderSuccess)(timeIntervalEl);
  return true;
}