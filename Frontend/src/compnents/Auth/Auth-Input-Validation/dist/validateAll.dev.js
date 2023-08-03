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
  var password = paramsObj.password;
  var passwordId = paramsObj.passwordId; //run validation all at once to display all errors to users

  var emailValResponse = (0, _validateEmailInput["default"])(email);
  if (emailValResponse.emailErrorMessage) return false, {
    emailValResponse: emailValResponse.emailErrorMessage
  }; //   validatePassword(password, passwordId);
  //   if (validatePassword(password, passwordId) && validatEmailId(email, emailId))
  //     return true;
  //   return false;
}