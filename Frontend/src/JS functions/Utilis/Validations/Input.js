import { validateEmail } from "./Email";
import { commaSeperationRegex } from "./commaSeperationRegex";
import { setErrorTextarea } from "./setError";
import { setSuccess } from "./setSucess";

function validateInput(input, textAreaRef) {
  let inputValError;
  // Check if input is empty or contains only whitespace
  const isEmpty = input.trim() === "";
  const isEmptyMessage = "Members' emails cannot be empty";
  inputValError = isEmptyMessage;
  if (isEmpty)
    return setErrorTextarea(textAreaRef, isEmptyMessage), { inputValError };

  //Check if all are separated by commas
  const inputsSplitted = input.split(",");

  const isValid = commaSeperationRegex(input);

  const ifOneInputError = "You don't need a comma if it's one detail";
  inputValError = ifOneInputError;
  if (!isValid && inputsSplitted.length == 2)
    return setErrorTextarea(textAreaRef, ifOneInputError), { inputValError };
  const commaErrorMultipleInputs = "Emails must be seperated by commas";
  inputValError = commaErrorMultipleInputs;
  if (!isValid)
    return (
      setErrorTextarea(textAreaRef, commaErrorMultipleInputs), { inputValError }
    );

  const isEmailsValid = validateEmail(input);

  const oneOnlyInvalidMessage = "Invalid email";

  inputValError = oneOnlyInvalidMessage;

  if (!isEmailsValid && inputsSplitted.length == 1)
    return (
      setErrorTextarea(textAreaRef, oneOnlyInvalidMessage), { inputValError }
    );

  const invalidEmailMessage = "At least one of the emails is Invalid";
  inputValError = invalidEmailMessage;
  if (!isEmailsValid)
    return (
      setErrorTextarea(textAreaRef, invalidEmailMessage), { inputValError }
    );

  setSuccess(textAreaRef);
  return true;
}

export { validateInput };
