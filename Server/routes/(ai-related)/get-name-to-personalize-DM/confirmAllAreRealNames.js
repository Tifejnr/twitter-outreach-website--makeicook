import countStringOccurrences from "../get-client-name/utils/is-client-a-team/countStringOccurences.js";
import isNameAMixtureOfTwoNames from "./isNameAMixtureOfTwoNames.js";
import { getNameToGreetWithFromAi, confirmNamePrompt } from "./route.js";

const thereText = "";

export default async function confirmAllAreRealNames(namesArray, finalName) {
  let firstNameResultsArray = [];

  for (let firstNameNow of namesArray) {
    const isNameARealName = await getNameToGreetWithFromAi(
      confirmNamePrompt,
      firstNameNow
    );

    if (isNameARealName == "Yes") {
      firstNameResultsArray.push(firstNameNow);
    }
  }

  if (firstNameResultsArray.length == 0) return thereText;

  const nameNow = firstNameResultsArray[0];

  const pureName = await isNameAMixtureOfTwoNames(nameNow);

  const areAllCharactersFound = canFindAllCharacters(pureName, finalName);

  if (areAllCharactersFound) return pureName;

  return thereText;
}

function canFindAllCharacters(searchString, sentence) {
  // Convert both searchString and sentence to lowercase for case-insensitive comparison
  const lowerSearchString = searchString.toLowerCase();
  const lowerSentence = sentence.toLowerCase();

  // Use a loop to check if each character in the searchString exists in the sentence
  for (const char of lowerSearchString) {
    if (!lowerSentence.includes(char)) {
      return false; // If any character is not found, return false
    }
  }

  return true; // If all characters are found, return true
}
