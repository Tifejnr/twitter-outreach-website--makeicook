"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.display = display;
exports.hide = hide;
exports.hideForms = hideForms;
exports.displayForms = displayForms;
exports.showCountsOfChecked = showCountsOfChecked;

function display(ele) {
  ele.style.display = "block";
}

function hide(ele) {
  ele.style.display = "none";
}

function hideForms(forms) {
  for (var i = 0; i < forms.length; i++) {
    forms[i].style.display = "none";
  }
}

function displayForms(forms) {
  for (var i = 0; i < forms.length; i++) {
    forms[i].style.display = "block";
  }
}

function showCountsOfChecked(checkboxesArray) {
  var noOfCheckedDisplayCont = document.getElementById("para");
  var totalCheckboxes = checkboxesArray.length;
  var noOfChecked = checkboxesArray.filter(function (checkbox) {
    return checkbox.checked;
  }).length;
  noOfCheckedDisplayCont.innerHTML = "".concat(noOfChecked, " of ").concat(totalCheckboxes);
}