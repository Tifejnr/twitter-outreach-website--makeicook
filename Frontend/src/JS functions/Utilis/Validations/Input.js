import validateEmail from "./Email";
import { commaSeperationRegex } from "./commaSeperationRegex";

function validateInput(input) {
  let inputValError;
  // Check if input is empty or contains only whitespace
  const isEmpty = input.trim() === "";
  const isEmptyMessage = "Members' emails cannot be empty";
  inputValError = isEmptyMessage;
  if (isEmpty) return { inputValError };

  //Check if all are separated by commas
  const inputsSplitted = input.split(",");

  const isValid = commaSeperationRegex(input);

  const ifOneInputError = "You don't need a comma if it's one detail";
  inputValError = ifOneInputError;

  if (!isValid && inputsSplitted.length == 2) return { inputValError };

  const commaErrorMultipleInputs = "Emails must be seperated by commas";
  inputValError = commaErrorMultipleInputs;

  if (!isValid) return { inputValError };

  const isEmailsValid = validateEmail(input);

  if (!isEmailsValid.invalidDetailsIndexArray) return true;

  const oneOnlyInvalidMessage = "Invalid email";

  if (isEmailsValid.invalidDetailsIndexArray && inputsSplitted.length == 1)
    return { inputValError: oneOnlyInvalidMessage };

  //add 1 to all the indexes to make users know it's on no 1 instead if 0
  const oneAddedToAllIndexes = isEmailsValid.invalidDetailsIndexArray.map(
    (value) => value + 1
  );
  const invalidIndexesJoined = oneAddedToAllIndexes.join(", ");

  const invalidEmailMessage = `Email ${invalidIndexesJoined} are Invalid`;
  if (isEmailsValid.invalidDetailsIndexArray && inputsSplitted.length > 1)
    return { inputValError: invalidEmailMessage };
}

export { validateInput };
