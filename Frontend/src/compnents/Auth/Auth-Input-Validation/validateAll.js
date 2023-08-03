import validateEmailInput from "./validateEmailInput";
import validatePassword from "./password-validation";

//combining both email validation and password validation into one function.
export default function validateAll(paramsObj) {
  const email = paramsObj.email;
  const password = paramsObj.password;

  //run validation all at once to display all errors to users
  const emailValResponse = validateEmailInput(email);

  const passwordValResponse = validatePassword(password);

  const resultofValidation = {
    passwordValResponse: passwordValResponse.passwordError,
    emailValResponse: emailValResponse.emailErrorMessage,
  };

  console.log(resultofValidation);
  return resultofValidation;
}
