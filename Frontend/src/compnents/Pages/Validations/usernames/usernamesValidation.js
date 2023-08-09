import React from "react";
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
  const oneOnlyInvalidMessage = "Invalid username";

  if (areUsernamesValid.invalidDetailsIndexArray && inputsSplitted.length == 1)
    return { usernameValError: oneOnlyInvalidMessage };

  const invalidIndexesJoined =
    areUsernamesValid.invalidDetailsIndexArray.join(", ");

  const invalidEmailMessage = `Usernames ${invalidIndexesJoined} are Invalid`;
  if (areUsernamesValid.invalidDetailsIndexArray && inputsSplitted.length > 1)
    return { usernameValError: invalidEmailMessage };
}
