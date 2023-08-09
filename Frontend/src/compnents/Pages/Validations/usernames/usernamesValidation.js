import React from "react";
import { commaSeperationRegex } from "../../../../JS functions/Utilis/Validations/commaSeperationRegex";
import atSymbolValidationPrefix from "./atSymbolValidationPrefix";

export default function usernamesValidation(executionParams) {
  let usernameValError;
  const input = executionParams.textAreaValue;

  console.log(input);
  // Check if input is empty or contains only whitespace
  const isEmpty = input.trim() === "";

  const isEmptyMessage = "Members' usernames cannot be empty";
  usernameValError = isEmptyMessage;
  if (isEmpty) return { usernameValError };

  //Check if all are separated by commas
  const inputsSplitted = input.split(",");
  const isValid = commaSeperationRegex(input);

  const ifOneInputError = "You don't need a comma if it's one username";
  usernameValError = ifOneInputError;
  if (!isValid && inputsSplitted.length == 2) return { usernameValError };

  const commaErrorMultipleInputs = "Usernames must be seperated by commas";
  usernameValError = commaErrorMultipleInputs;
  if (!isValid) return { usernameValError };

  const areUsernamesValid = atSymbolValidationPrefix(input);

  console.log(areUsernamesValid);

  if (areUsernamesValid.usernamesValidationSucess) return true;

  const oneOnlyInvalidMessage = "Invalid username";

  usernameValError = oneOnlyInvalidMessage;

  if (areUsernamesValid.invalidDetailsIndexArray && inputsSplitted.length == 1)
    return { usernameValError };

  const invalidEmailMessage = "At least one of the usernames is Invalid";
  usernameValError = invalidEmailMessage;
  if (areUsernamesValid.invalidDetailsIndexArray && inputsSplitted.length > 1)
    return { usernameValError };

  return true;
}
