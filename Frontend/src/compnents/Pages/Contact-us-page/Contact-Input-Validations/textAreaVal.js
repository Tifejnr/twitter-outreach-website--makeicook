export default function textAreaValidation(input) {
  const regex = /^(\S+\s){4}\S+.*$/;

  const hasAtLeast5Words = regex.test(input);

  console.log(hasAtLeast5Words);

  return hasAtLeast5Words;
}
