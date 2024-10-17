import areFirstTwoXtersTheSame from "./areFirstTwoXtersTheSame.js";

export default function isFirstNameAlmostSameWithSecondName(
  firstName,
  secondName
) {
  if (!firstName || !secondName) return false;

  if (firstName == secondName) return false;

  const uniqueSecondNameComing = secondName;
  firstName = firstName
    .toLowerCase()
    .replace(/\bmr\.?\b/gi, "")
    .replace(/\bsir\.?\b/gi, "")
    .replace(/\bms\.?\b/gi, "")

    .trim();
  secondName = secondName
    .toLowerCase()
    .replace(/\bmr\.?\b/gi, "")
    .replace(/\bsir\.?\b/gi, "")
    .replace(/\bms\.?\b/gi, "")
    .trim();

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

  // console.log(
  //   `   passedArray.length >= firstNameLength - 1 &&
  //   areFirstTwoAlphabetsTheSame`,
  //   passedArray.length,
  //   firstNameLength - 1,
  //   areFirstTwoAlphabetsTheSame
  // );

  if (
    passedArray.length >= firstNameLength - 1 &&
    firstNameLength <= secondName.length &&
    areFirstTwoAlphabetsTheSame
  ) {
    return uniqueSecondNameComing;
  }

  return false;
}
