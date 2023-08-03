"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateInputs;

var _validateEmailInput = _interopRequireDefault(require("../../compnents/Auth/Auth-Input-Validation/validateEmailInput"));

var _passwordValidation = _interopRequireDefault(require("../../compnents/Auth/Auth-Input-Validation/password-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//combining both email validation and password validation into one function.
function validateInputs(paramsObj) {
  var email = paramsObj.email;
  var emailId = paramsObj.emailId;
  var password = paramsObj.password;
  var passwordId = paramsObj.passwordId; //run validation all at once to display all errors to users

  (0, _validateEmailInput["default"])(email, emailId);
  (0, _passwordValidation["default"])(password, passwordId);
  if ((0, _passwordValidation["default"])(password, passwordId) && (0, _validateEmailInput["default"])(email, emailId)) return true;
  return false;
}