import validateTextArea from "./textAreaValidation";
import validateRequestHeading from "./headerValidation";

export default function makeRequestInputValidation(params) {
  const { textAreaText, headingText, isTextAreaOpened } = params;

  const requestHeadingTextValidationResult =
    validateRequestHeading(headingText);

  if (requestHeadingTextValidationResult.requestHeaderError)
    return requestHeadingTextValidationResult;

  if (isTextAreaOpened) {
    const textareaValidationResult = validateTextArea(textAreaText);

    if (textareaValidationResult.textAreaError) return textareaValidationResult;
  }

  return {};
}
