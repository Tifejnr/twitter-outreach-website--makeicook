import entryCodeValidation from "./entry-code-validation/entryCodeValidation";
import fullnameValidation from "./fullname-validation/fullnameValidation";
import validatePassword from "./password-validation";
import validateEmailInput from "./validateEmailInput";

export interface ParamsObjTypes {
  fullname?: string;
  email: string;
  password: string;
  entryCode?: string;
  isItSignUP?: boolean;
}

// Combining both email validation and password validation into one function.
export default function validateAll(paramsObj: ParamsObjTypes) {
  const { fullname, email, password, entryCode, isItSignUP } = paramsObj;

  let fullnameErrorMessage: string | undefined;
  let entryCodeErrorMessage: string | undefined;

  // Run validation all at once to display all errors to users
  const emailValResponse = validateEmailInput(email);
  const passwordValResponse = validatePassword(password);

  if (isItSignUP) {
    const fullnameValResponse = fullnameValidation(fullname ?? "");
    const entryCodeValResponse = entryCodeValidation(entryCode ?? "");

    // Check the type of fullnameValResponse and handle accordingly
    if (
      typeof fullnameValResponse === "object" &&
      "fullnameValidationError" in fullnameValResponse
    ) {
      fullnameErrorMessage = fullnameValResponse.fullnameValidationError;
    }

    // Check the type of  entryCodeValResponse and handle accordingly
    if (
      typeof entryCodeValResponse === "object" &&
      "entryCodeError" in entryCodeValResponse
    ) {
      entryCodeErrorMessage = entryCodeValResponse.entryCodeError;
    }
  }

  // Check the type of emailValResponse and handle accordingly
  let emailErrorMessage: string | undefined;
  if (
    typeof emailValResponse === "object" &&
    "emailErrorMessage" in emailValResponse
  ) {
    emailErrorMessage = emailValResponse.emailErrorMessage;
  }

  // Check the type of passwordValResponse and handle accordingly
  let extensionKeyError: string | undefined;
  if (
    typeof passwordValResponse === "object" &&
    "extensionKeyError" in passwordValResponse
  ) {
    extensionKeyError = passwordValResponse.extensionKeyError;
  }

  return {
    extensionKeyValResponse: extensionKeyError,
    emailValResponse: emailErrorMessage,
    entryCodeErrorMessage,
    fullnameErrorMessage,
  };
}
