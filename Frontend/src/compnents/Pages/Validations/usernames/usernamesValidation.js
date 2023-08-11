import { commaSeperationRegex } from "../../../../JS functions/Utilis/Validations/commaSeperationRegex";
import atSymbolValidationPrefix from "./atSymbolValidationPrefix";

export default function usernamesValidation(input) {
  // Check if input is empty or contains only whitespace
  const isEmpty = input.trim() === "";

  const isEmptyMessage = "Members' usernames cannot be empty";
  if (isEmpty) return { usernameValError: isEmptyMessage };

  //Check if all are separated by commas
  const inputsSplitted = input.split(",");
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

  const invalidUsernamesMessage = `Usernames ${invalidIndexesJoined} must start with "@" symbol`;
  if (areUsernamesValid.invalidDetailsIndexArray && inputsSplitted.length > 1)
    return { usernameValError: invalidUsernamesMessage };
}
