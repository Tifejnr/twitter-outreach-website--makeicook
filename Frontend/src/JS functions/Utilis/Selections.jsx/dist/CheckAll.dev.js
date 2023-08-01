"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CheckAll;

function CheckAll(checkboxesArray) {
  checkboxesArray.forEach(function (checkbox) {
    checkbox.checked = true;
  });
}