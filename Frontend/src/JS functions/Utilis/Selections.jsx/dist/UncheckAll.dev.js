"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = UncheckAll;

var _EleDisplay = require("../EleDisplay");

function UncheckAll(checkboxesArray) {
  checkboxesArray.forEach(function (checkbox) {
    checkbox.checked = false;
    (0, _EleDisplay.showCountsOfChecked)(checkboxesArray);
  });
}