let emailErrorMessage;

const isValidEmailId = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export default function validateEmailInput(email) {
  if (email === "") {
    emailErrorMessage = "Email cannot be empty";
    return { emailErrorMessage };
  }

  if (!isValidEmailId(email)) {
    emailErrorMessage = "Provide a valid email address";
    return { emailErrorMessage };
  }

  return true;
}
