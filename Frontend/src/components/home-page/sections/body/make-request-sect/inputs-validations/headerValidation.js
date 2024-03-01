import requestConstantValues from "../constant-values/requestConstantValues";

export default function validateRequestHeading(headingText: string): {
  requestHeaderError?: string;
} {
  if (headingText == requestConstantValues.selectRequestHeadingText)
    return {
      requestHeaderError:
        requestConstantValues.noRequestHeadingSelectedErrorText,
    };

  return {};
}
