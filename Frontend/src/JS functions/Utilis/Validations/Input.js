import { validateEmail } from "./Email";

function validateInput(input) {
  // Check if input is empty or contains only whitespace
  const isEmpty = input.trim() === "";

  if (isEmpty) return console.log("email is empty");

  // Check if input is a valid email
  const isEmailValid = validateEmail(input);

  if (!isEmailValid) return console.log("invalid email");

  return true;
}

export {validateInput}