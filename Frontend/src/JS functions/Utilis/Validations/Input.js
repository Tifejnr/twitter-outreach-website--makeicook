import useStore from "../../../compnents/Hooks/Zustand/usersStore";
import { validateEmail } from "./Email";
import { commaSeperationRegex } from "./commaSeperationRegex";
import { setErrorTextarea } from "./setError";
import { setSuccess } from "./setSucess";

function validateInput() {
  const textAreaRefEl = useStore((state) => state.textAreaRefEl);
  const textAreaValue = useStore((state) => state.textAreaValue);
  const setExecutionErrorBtn = useStore((state) => state.setExecutionErrorBtn);

  const input = textAreaValue;
  const textAreaRef = textAreaRefEl;
  // Check if input is empty or contains only whitespace
  const isEmpty = input.trim() === "";
  const isEmptyMessage = "Members' emails cannot be empty";

  if (isEmpty)
    return (
      setErrorTextarea(textAreaRef, isEmptyMessage),
      setExecutionErrorBtn(isEmptyMessage)
    );

  //Check if all are separated by commas
  const inputsSplitted = input.split(",");

  const isValid = commaSeperationRegex(input);
  const commaErrorMultipleInputs = "Emails must be seperated by commas";

  const ifOneInputError = "You don't need a comma if it's one detail";
  if (!isValid && inputsSplitted.length == 2)
    return setErrorTextarea(textAreaRef, ifOneInputError);

  if (!isValid) return setErrorTextarea(textAreaRef, commaErrorMultipleInputs);

  const isEmailsValid = validateEmail(input);

  const invalidEmailMessage = "At least one of the emails is Invalid";
  const oneOnlyInvalidMessage = "Invalid email";

  if (!isEmailsValid && inputsSplitted.length == 1)
    return setErrorTextarea(textAreaRef, oneOnlyInvalidMessage);

  if (!isEmailsValid) return setErrorTextarea(textAreaRef, invalidEmailMessage);

  setSuccess(textAreaRef);
  return true;
}

export { validateInput };
