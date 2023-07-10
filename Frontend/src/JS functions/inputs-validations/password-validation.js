function validatePassword() {
  const password = passwordId.value.trim();
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
