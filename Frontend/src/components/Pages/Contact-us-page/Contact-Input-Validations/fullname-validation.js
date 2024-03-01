import removeDoubleSpaces from "../../../auth/utils/removeDouleSpaces/removeDoubleSpaces";

export default function fullNameValidation(fullname) {
  const regex = /\b\w{2,}\s+\w{2,}\b/;

  const fullnameSpacesRemoved = removeDoubleSpaces(fullname);

  const isValidInput = regex.test(fullnameSpacesRemoved);

  return isValidInput;
}
