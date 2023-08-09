//validates all email inputs in  a string
// function validateEmail(email) {
//   const emailPattern = /^\s*\w+@\w+\.\w+(\s*,\s*\w+@\w+\.\w+)*\s*$/;
//   return emailPattern.test(email);
// }

const regex = /^[\w\.-]+@[\w\.-]+\.\w+$/;

export default function validateEmail(input) {
  let invalidDetailsIndexArray = [];
  const inputs = input.split(/\s*,\s*/);

  inputs.forEach((input, index) => {
    //push to array of failed validation if invalid
    if (!regex.test(input)) {
      invalidDetailsIndexArray.push(index);
    }
  });

  if (invalidDetailsIndexArray.length > 0) return { invalidDetailsIndexArray };

  return { emailValidationSucess: true };
}
