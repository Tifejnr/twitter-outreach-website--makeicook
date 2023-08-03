"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateEmailInput;
var emailErrorMessage;

var isValidEmailId = function isValidEmailId(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

function validateEmailInput(email) {
  if (email === "") {
    emailErrorMessage = "Email is required";
    return {
      emailErrorMessage: emailErrorMessage
    };
  }

  if (!isValidEmailId(email)) {
    emailErrorMessage = "Provide a valid email address";
    return {
      emailErrorMessage: emailErrorMessage
    };
  }

  return true;
}