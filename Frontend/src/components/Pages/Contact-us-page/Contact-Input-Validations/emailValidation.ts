export default function emailValidation(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValidEmail = emailRegex.test(email.trim());

  return isValidEmail;
}
