import areFirstTwoXtersTheSame from "./areFirstTwoXtersTheSame.js";

export default function isFirstNameAlmostSameWithSecondName(
  firstName,
  secondName
) {
  if (!firstName || !secondName) return false;

  if (firstName == secondName) return false;

  const uniqueSecondNameComing = secondName;
  firstName = firstName.toLowerCase().trim().replace(/mr\.?/i, "");
  secondName = secondName.toLowerCase().trim().replace(/mr\.?/i, "");

  const firstNameLength = firstName.length;

  const passedArray = [];

  // For every letter in the shortest name
  for (let char of firstName) {
    // Check if the letter is present in the current name
    if (secondName.includes(char)) {
      passedArray.push(1); // Push 1 for each match
    }
  }

  const areFirstTwoAlphabetsTheSame = areFirstTwoXtersTheSame(
    firstName,
    secondName
  );

  if (
    passedArray.length >= firstNameLength - 1 &&
    areFirstTwoAlphabetsTheSame
  ) {
    return uniqueSecondNameComing;
  }

  return false;
}
