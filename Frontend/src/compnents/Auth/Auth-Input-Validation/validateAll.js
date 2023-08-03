import validateEmailInput from "./validateEmailInput";
import validatePassword from "./password-validation";

//combining both email validation and password validation into one function.
export default function validateAll(paramsObj) {
  const email = paramsObj.email;
  const password = paramsObj.password;
  const passwordId = paramsObj.passwordId;

  //run validation all at once to display all errors to users
  const emailValResponse = validateEmailInput(email);

  if (emailValResponse.emailErrorMessage)
    return false, { emailValResponse: emailValResponse.emailErrorMessage };

  //   validatePassword(password, passwordId);

  //   if (validatePassword(password, passwordId) && validatEmailId(email, emailId))
  //     return true;

  //   return false;
}
