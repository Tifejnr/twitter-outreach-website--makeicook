import validatEmailId from "./email-validation";
import validatePassword from "./password-validation";

export default function validateInputs(paramsObj) {
  const email = paramsObj.email;
  const emailId = paramsObj.emailId;
  const password = paramsObj.password;
  const passwordId = paramsObj.passwordId;

  validatEmailId(email, emailId);
  validatePassword(password, passwordId);

  if (validatePassword(password, passwordId) && validatEmailId(email, emailId))
    return true;

  return false;
}
