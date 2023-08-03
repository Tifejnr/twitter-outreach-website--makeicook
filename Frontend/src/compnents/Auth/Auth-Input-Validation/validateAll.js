import validateEmailInput from "./validateEmailInput";
import validatePassword from "./password-validation";

//combining both email validation and password validation into one function.
export default function validateAll(paramsObj) {
  const email = paramsObj.email;
  const password = paramsObj.password;

  //run validation all at once to display all errors to users
  const emailValResponse = validateEmailInput(email);

  if (emailValResponse.emailErrorMessage)
    return { emailValResponse: emailValResponse.emailErrorMessage };

  const passwordValResponse = validatePassword(password);

  if (passwordValResponse.passwordError)
    return { passwordValResponse: passwordValResponse.passwordError };

  if (validatePassword(password) && validateEmailInput(email)) return true;

  return false;
}
