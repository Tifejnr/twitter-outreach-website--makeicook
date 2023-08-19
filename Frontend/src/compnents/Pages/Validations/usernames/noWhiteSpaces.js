const noWhiteSpaceRegex = /^\S+$/;

export default function noWhitespaceValidation(input) {
  // Use a regular expression to check for the absence of whitespace characters

  let whiteSpacesPresentArray = [];
  const inputs = input.split(/\s*,\s*/);

  console.log(inputs);

  inputs.forEach((input, index) => {
    //push to array of failed validation if invalid
    if (!noWhiteSpaceRegex.test(input)) {
      console.log("yeah");
      whiteSpacesPresentArray.push(index);
    }
  });

  if (whiteSpacesPresentArray.length > 0) return { whiteSpacesPresentArray };

  return { whiteSpaceValidationSucess: true };
}
