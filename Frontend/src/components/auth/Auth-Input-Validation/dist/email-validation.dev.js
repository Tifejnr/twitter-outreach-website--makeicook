"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateEmailInput;
var errorMess;

var isValidEmailId = function isValidEmailId(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

function validateEmailInput(email) {
  if (email === "") {
    errorMess = "Email is required";
    return {
      errorMess: errorMess
    };
  }

  if (!isValidEmailId(email)) {
    errorMess = "Provide a valid email address";
    return {
      errorMess: errorMess
    };
  }

  return true;
}