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

  const noOfNameOccurenceTime = countStringOccurrences(finalName, pureName);

  console.log("noOfNameOccurenceTime ", noOfNameOccurenceTime, pureName);

  if (noOfNameOccurenceTime == 0) return thereText;

  return pureName;
}
