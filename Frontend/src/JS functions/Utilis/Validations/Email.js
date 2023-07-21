//validates all email inputs in  a string
function validateEmail(email) {
  const emailPattern = /^\s*\w+@\w+\.\w+(\s*,\s*\w+@\w+\.\w+)*\s*$/;
  return emailPattern.test(email);
}

export { validateEmail };
