const isValidEmailId = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export default function forgotPasswordEmailVal(email) {
  let emailErrorMessage;
  if (email === "") {
    emailErrorMessage = "Email cannot be empty";
    return { emailErrorMessage };
  }

  if (!isValidEmailId(email)) {
    emailErrorMessage = "Provide a valid email address";
    return { emailErrorMessage };
  }

  return {};
}
