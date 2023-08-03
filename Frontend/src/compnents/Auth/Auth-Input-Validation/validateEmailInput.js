let emailErrorMessage;

const isValidEmailId = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default function validateEmailInput(email) {
  if (email === "") {
    emailErrorMessage = "Email is required";
    return { emailErrorMessage };
  }
  if (!isValidEmailId(email)) {
    emailErrorMessage = "Provide a valid email address";
    return { emailErrorMessage };
  }

  return true;
}
