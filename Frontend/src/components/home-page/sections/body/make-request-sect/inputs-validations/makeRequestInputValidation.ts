import validateTextArea from "./textAreaValidation";
import validateRequestHeading from "./headerValidation";

export type MakeRequestParamType = {
  textAreaText: string;
  headingText: string;
  isTextAreaOpened: boolean;
};

type MakeRequestResultType = {
  requestHeaderError?: string;
  textAreaError?: string;
};

export default function makeRequestInputValidation(
  params: MakeRequestParamType
): MakeRequestResultType {
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
