import { commaSeperationRegex } from "../../../../JS functions/Utilis/Validations/commaSeperationRegex";
import atSymbolValidationPrefix from "./atSymbolValidationPrefix";

export default function usernamesValidation(inputValue) {
  // Check if input is empty or contains only whitespace
  const input = inputValue.trim();
  const isEmpty = input === "";

  const isEmptyMessage = "Members' usernames cannot be empty";
  if (isEmpty) return { usernameValError: isEmptyMessage };

  //Check if all are separated by commas
  const inputsSplitted = input.split(/\s*,\s*/);
  const isValid = commaSeperationRegex(input);

  const ifOneInputError = "You don't need a comma if it's one username";
  if (!isValid && inputsSplitted.length == 2)
    return { usernameValError: ifOneInputError };

  const commaErrorMultipleInputs = "Usernames must be seperated by commas";
  if (!isValid) return { usernameValError: commaErrorMultipleInputs };

  const areUsernamesValid = atSymbolValidationPrefix(input);

  if (!areUsernamesValid.invalidDetailsIndexArray) return true;

  const oneOnlyInvalidMessage = `Username must start with "@" symbol`;

  if (areUsernamesValid.invalidDetailsIndexArray && inputsSplitted.length == 1)
    return { usernameValError: oneOnlyInvalidMessage };

  //add 1 to all the indexes to make users know it's on no 1 instead if 0
  const oneAddedToAllIndexes = areUsernamesValid.invalidDetailsIndexArray.map(
    (value) => value + 1
  );
  const invalidIndexesJoined = oneAddedToAllIndexes.join(", ");

  const invalidUsernamesMessageSingular = `Username ${invalidIndexesJoined} must start with "@" symbol`;
  const invalidUsernamesMessagePlural = `Usernames ${invalidIndexesJoined} must start with "@" symbol`;
  if (
    areUsernamesValid.invalidDetailsIndexArray &&
    inputsSplitted.length > 1 &&
    oneAddedToAllIndexes.length === 1
  )
    return { usernameValError: invalidUsernamesMessageSingular };

  if (
    areUsernamesValid.invalidDetailsIndexArray &&
    inputsSplitted.length > 1 &&
    oneAddedToAllIndexes.length > 1
  )
    return { usernameValError: invalidUsernamesMessagePlural };
}
