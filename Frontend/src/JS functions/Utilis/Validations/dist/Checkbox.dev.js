"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAnyCheckboxChecked = isAnyCheckboxChecked;

function isAnyCheckboxChecked(checkboxesArray) {
  var isCheckedArray = Array.from(checkboxesArray).map(function (checkbox) {
    return checkbox.checked;
  });
  return isCheckedArray.includes(true);
}