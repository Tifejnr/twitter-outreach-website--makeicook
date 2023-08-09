const regex = /^@[a-zA-Z]+$/;

export default function atSymbolValidationPrefix(input) {
  let invalidDetailsIndexArray = [];
  const inputs = input.split(/\s*,\s*/);

  inputs.forEach((input, index) => {
    if (regex.test(input)) {
      console.log(`Input at index ${index} "${input}" is valid`);
    } else {
      console.log(`Input at index ${index} "${input}" is not valid`);
      invalidDetailsIndexArray.push(index);
    }
  });

  if (invalidDetailsIndexArray.length > 0) return invalidDetailsIndexArray;
}
