import removeDoubleSpaces from "@/app/components/auth/utils/removeDouleSpaces/removeDoubleSpaces";

export default function fullNameValidation(fullname: string) {
  const regex = /\b\w{2,}\s+\w{2,}\b/;

  const fullnameSpacesRemoved = removeDoubleSpaces(fullname);

  const isValidInput = regex.test(fullnameSpacesRemoved);

  return isValidInput;
}
