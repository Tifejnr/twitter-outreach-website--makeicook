import { validateEmail } from "./Email";
import { setErrorTextarea } from "./setError";
import { setSuccess } from "./setSucess";

function validateInput(input, textAreaRef) {
  // Check if input is empty or contains only whitespace
  const isEmpty = input.trim() === "";
  const isEmptyMessage = "Members' emails cannot be empty";

  if (isEmpty) return setErrorTextarea(textAreaRef, isEmptyMessage);

  //Check if all are separated by commas
  const regex = /^\w+(,\s*\w+)*$/;
  const isValid = regex.test(input);
  const commaError = "Emails must be seperated by commas";
  if (!isValid) return setErrorTextarea(textAreaRef, commaError);

  const inputsSplittedByComma = input.split(",");

  // Check if inputs are  all valid email
  for (const eachInput of inputsSplittedByComma) {
    const isEmailValid = validateEmail(eachInput);

    console.log(isEmailValid);

    const invalidEmailMessage = "One of the emails is Invalid";

    if (!isEmailValid)
      return setErrorTextarea(textAreaRef, invalidEmailMessage);
  }

  setSuccess(textAreaRef);
  return true;
}

export { validateInput };
