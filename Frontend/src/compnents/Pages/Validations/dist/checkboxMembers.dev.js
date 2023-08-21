"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isAnyMemberCheckboxChecked;

function isAnyMemberCheckboxChecked(checkboxes) {
  var isCheckedArray = Array.from(checkboxes).map(function (checkbox) {
    return checkbox.checked;
  });
  return isCheckedArray.includes(true);
}