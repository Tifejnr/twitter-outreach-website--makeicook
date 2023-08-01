"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = UncheckAll;

function UncheckAll(checkboxesArray) {
  checkboxesArray.forEach(function (checkbox) {
    checkbox.checked = false;
  });
}