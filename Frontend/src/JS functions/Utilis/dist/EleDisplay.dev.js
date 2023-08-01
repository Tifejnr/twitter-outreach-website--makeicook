"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.display = display;
exports.hide = hide;
exports.hideForms = hideForms;
exports.displayForms = displayForms;

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