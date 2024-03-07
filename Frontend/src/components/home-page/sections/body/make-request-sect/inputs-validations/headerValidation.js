import requestConstantValues from "../constant-values/requestConstantValues";

export default function validateRequestHeading(headingText) {
  if (headingText == requestConstantValues.selectRequestHeadingText)
    return {
      requestHeaderError:
        requestConstantValues.noRequestHeadingSelectedErrorText,
    };

  return {};
}
