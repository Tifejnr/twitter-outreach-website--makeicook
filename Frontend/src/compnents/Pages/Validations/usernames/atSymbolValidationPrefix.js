const regex = /^@[a-zA-Z]+$/;

export default function atSymbolValidationPrefix(inputs) {
  inputs.forEach((input, index) => {
    if (regex.test(input)) {
      console.log(`Input at index ${index} "${input}" is valid`);
    } else {
      console.log(`Input at index ${index} "${input}" is not valid`);
    }
  });
}
