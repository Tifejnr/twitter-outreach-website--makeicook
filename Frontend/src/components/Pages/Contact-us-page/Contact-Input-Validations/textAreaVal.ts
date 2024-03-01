import removeDoubleSpaces from "@/app/components/auth/utils/removeDouleSpaces/removeDoubleSpaces";

export default function textAreaValidation(input: string) {
  const regex = /^(\S+\s){4}\S+.*$/;

  const inputDoubleSpacesRemoved = removeDoubleSpaces(input);

  const hasAtLeast5Words = regex.test(inputDoubleSpacesRemoved);

  return hasAtLeast5Words;
}
