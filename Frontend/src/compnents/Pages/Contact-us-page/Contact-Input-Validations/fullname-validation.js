export default function fullNameValidation(inputString) {
  const regex = /\b\w{2,}\s+\w{2,}\b/;

  const isValidInput = regex.test(inputString);

  return isValidInput;
}
