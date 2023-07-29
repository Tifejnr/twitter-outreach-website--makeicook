"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CheckAll;

var _EleDisplay = require("../EleDisplay");

function CheckAll(checkboxesArray) {
  checkboxesArray.forEach(function (checkbox) {
    checkbox.checked = true;
    (0, _EleDisplay.showCountsOfChecked)(checkboxesArray);
  });
}