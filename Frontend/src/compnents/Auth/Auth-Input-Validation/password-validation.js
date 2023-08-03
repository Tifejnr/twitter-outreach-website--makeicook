import setSuccess from "./set-success-noti";
import setError from "../../../JS functions/inputs-validations/set-error-noti";

export default function validatePassword(password, passwordId) {
  if (password === "") {
    setError(passwordId, "Password is required");
    return false;
  } else if (password.length < 4) {
    setError(passwordId, "Password must be at least 4 characters.");
    return false;
  } else {
    setSuccess(passwordId);
    return true;
  }
}
