export default function validatePassword(password) {
  if (password === "") return { passwordError: "Password cannot be empty" };
  if (password.length < 6)
    return { passwordError: "Password must be at least 6 characters." };

  return true;
}
