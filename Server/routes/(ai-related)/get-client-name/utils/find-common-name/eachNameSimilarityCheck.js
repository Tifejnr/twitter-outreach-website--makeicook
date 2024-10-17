import isFirstNameAlmostSameWithSecondName from "./isFirstNameAlmostSameWithSecondName.js";

export default function eachNameAgainstOtherNamesSimilarityCheck(
  arrayNoForNameInTurn,
  namesArray
) {
  let firstNameResultsArray = [];

  //firstname result
  // Check each name against every other name
  for (let i = 0; i < namesArray.length; i++) {
    const firstNameNow = namesArray[arrayNoForNameInTurn];

    const doesNameMatchAnyNameResult = isFirstNameAlmostSameWithSecondName(
      firstNameNow,
      namesArray[i]
    );

    if (doesNameMatchAnyNameResult) {
      firstNameResultsArray.push(doesNameMatchAnyNameResult);
    }
  }

  console.log(
    "firstNameResultsArray, ",
    firstNameResultsArray,
    doesNameMatchAnyNameResult
  );

  if (firstNameResultsArray.length == 0) return false;

  return firstNameResultsArray[0];
}
