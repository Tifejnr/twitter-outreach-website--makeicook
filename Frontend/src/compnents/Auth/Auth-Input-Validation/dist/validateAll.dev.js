"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateAll;

var _validateEmailInput = _interopRequireDefault(require("./validateEmailInput"));

var _passwordValidation = _interopRequireDefault(require("./password-validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//combining both email validation and password validation into one function.
function validateAll(paramsObj) {
  var email = paramsObj.email;
  var password = paramsObj.password; //run validation all at once to display all errors to users

  var emailValResponse = (0, _validateEmailInput["default"])(email);
  if (emailValResponse.emailErrorMessage) return {
    emailValResponse: emailValResponse.emailErrorMessage
  };
  var passwordValResponse = (0, _passwordValidation["default"])(password);
  if (passwordValResponse.passwordError) return {
    passwordValResponse: passwordValResponse.passwordError
  };
  if ((0, _passwordValidation["default"])(password) && (0, _validateEmailInput["default"])(email)) return true;
  return false;
}