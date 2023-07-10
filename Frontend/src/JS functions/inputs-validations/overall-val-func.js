import validatEmailId from "./email-validation";
import validatePassword from "./password-validation";

//combining both email validation and password validation into one function.
export default function validateInputs(paramsObj) {
  const email = paramsObj.email;
  const emailId = paramsObj.emailId;
  const password = paramsObj.password;
  const passwordId = paramsObj.passwordId;

  //run validation all at once to display all errors to users
  validatEmailId(email, emailId);
  validatePassword(password, passwordId);

  if (validatePassword(password, passwordId) && validatEmailId(email, emailId))
    return true;

  return false;
}
