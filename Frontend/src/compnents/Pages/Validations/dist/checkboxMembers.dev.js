"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isAnyMemberCheckboxChecked;

function isAnyMemberCheckboxChecked(checkboxesArray) {
  var isCheckedArray = Array.from(checkboxesArray).map(function (checkbox) {
    return checkbox.checked;
  });
  return isCheckedArray.includes(true);
}