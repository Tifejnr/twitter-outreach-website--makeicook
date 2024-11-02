import { getNameToGreetWithFromAi, confirmNamePrompt } from "./route.js";

export default async function confirmAllAreRealNames(namesArray) {
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

  return firstNameResultsArray[0];
}
