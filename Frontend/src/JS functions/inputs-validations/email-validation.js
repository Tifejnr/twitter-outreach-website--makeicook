const isValidEmailId = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  validatEmailId();
  validatePassword();
  if (validatePassword() && validatEmailId()) {
    return true;
  } else {
    return false;
  }
};

function validatEmailId() {
  const email = emailId.value;
  console.log(email);
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
