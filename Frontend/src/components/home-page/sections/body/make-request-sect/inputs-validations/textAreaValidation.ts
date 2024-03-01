import requestConstantValues from "../constant-values/requestConstantValues";

export default function validateTextArea(textAreaText: string): {
  textAreaError?: string;
} {
  const messageValue = textAreaText.trim();
  if (messageValue === "")
    return { textAreaError: requestConstantValues.requestCannotBeEmptyText };
  if (messageValue.length < 4)
    return { textAreaError: requestConstantValues.requestLessThan4XtersText };

  return {};
}
