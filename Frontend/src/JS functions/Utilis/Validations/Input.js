import { validateEmail } from "./Email";
import { setErrorTextarea } from "./setError";
import { setSuccess } from "./setSucess";

function validateInput(input, textAreaRef) {
  // Check if input is empty or contains only whitespace
  const isEmpty = input.trim() === "";
  const isEmptyMessage = "Members' emails cannot be empty";

  if (isEmpty) return setErrorTextarea(textAreaRef, isEmptyMessage);

  // Check if input is a valid email
  const isEmailValid = validateEmail(input);

  const invalidEmailMessage = "Invalid email";

  if (!isEmailValid) return setErrorTextarea(textAreaRef, invalidEmailMessage);
  setSuccess(textAreaRef);
  return true;
}

export { validateInput };
