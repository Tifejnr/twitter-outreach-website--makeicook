import setSuccess from "./set-success-noti";
import setError from "./set-error-noti";

const isValidEmailId = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default function validatEmailId(email, emailId) {
  if (email === "") {
    setError(emailId, "Email is required");
    return false;
  } else if (!isValidEmailId(email)) {
    setError(emailId, "Provide a valid email address");
    return false;
  } else {
    setSuccess(emailId);
    return true;
  }
}
