"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validatePassword;

var _setSuccessNoti = _interopRequireDefault(require("./set-success-noti"));

var _setErrorNoti = _interopRequireDefault(require("../../../JS functions/inputs-validations/set-error-noti"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function validatePassword(password, passwordId) {
  if (password === "") {
    (0, _setErrorNoti["default"])(passwordId, "Password is required");
    return false;
  } else if (password.length < 4) {
    (0, _setErrorNoti["default"])(passwordId, "Password must be at least 4 characters.");
    return false;
  } else {
    (0, _setSuccessNoti["default"])(passwordId);
    return true;
  }
}