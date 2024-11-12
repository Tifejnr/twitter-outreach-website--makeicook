import countStringOccurrences from "../get-client-name/utils/is-client-a-team/countStringOccurences.js";
import isNameAMixtureOfTwoNames from "./isNameAMixtureOfTwoNames.js";
import { getNameToGreetWithFromAi, confirmNamePrompt } from "./route.js";

export default async function confirmAllAreRealNames(namesArray, finalName) {
  let firstNameResultsArray = [];

  for (let i = 0; i < namesArray.length; i++) {
    const firstNameNow = namesArray[i];

    const isNameARealName = await getNameToGreetWithFromAi(
      confirmNamePrompt,
      firstNameNow
    );

    if (isNameARealName == "Yes") {
      firstNameResultsArray.push(firstNameNow);
    }
  }

  if (firstNameResultsArray.length == 0) return "there";

  const nameNow = firstNameResultsArray[0];

  const pureName = await isNameAMixtureOfTwoNames(nameNow);

  const noOfNameOccurenceTime = countStringOccurrences(finalName, pureName);

  if (noOfNameOccurenceTime == 0) return "there";

  return pureName;
}
