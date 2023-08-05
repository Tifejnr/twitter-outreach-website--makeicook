export default function textAreaValidation(input) {
  const regex = /^(\S+\s){4}\S+.*$/;

  const hasAtLeast5Words = regex.test(input);

  return hasAtLeast5Words;
}
