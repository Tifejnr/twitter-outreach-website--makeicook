const isValidEmailId = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export default function forgotPasswordEmailVal(email: string): {
  emailErrorMessage?: string;
} {
  let emailErrorMessage: string;
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
