"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validatePassword;

function validatePassword(password) {
  if (password === "") return {
    passwordError: "Password is required"
  };
  if (password.length < 6) return {
    passwordError: "Password must be at least 6 characters."
  };
  return true;
}