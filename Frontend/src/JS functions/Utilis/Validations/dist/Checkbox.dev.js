"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAnyCheckboxChecked = isAnyCheckboxChecked;

function isAnyCheckboxChecked() {
  var checkboxes = document.querySelectorAll(".board-checkbox");
  var isCheckedArray = Array.from(checkboxes).map(function (checkbox) {
    return checkbox.checked;
  });
  return isCheckedArray.includes(true);
}