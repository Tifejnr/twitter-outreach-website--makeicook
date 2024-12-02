import { getNameToGreetWithFromAi, confirmNamePrompt } from "./route.js";

const promptReturnTheFirstNameFromMixture = `This is a mixture of two different names

Only return the first name without quotes. don't explain anything, don't prefix your response with anything.
`;

const promptDoesTHisContainMixtureOfTwoNames = `Return Yes or No only.

Is this a mixture of two different names together.`;

const promptReturnPureFormOfTheName = `
Only return the first pure from of the name without quotes. don't explain anything, don't prefix your response with anything.
`;

export default async function isNameAMixtureOfTwoNames(nameToCheck) {
  //yes or no if it's a mixture name
  const isItAMixtureOfTwoNames = await getNameToGreetWithFromAi(
    promptDoesTHisContainMixtureOfTwoNames,
    nameToCheck
  );

  if (isItAMixtureOfTwoNames.includes("Yes")) {
    const firstNameToUse = await getNameToGreetWithFromAi(
      promptReturnTheFirstNameFromMixture,
      nameToCheck
    );

    const isNamePlainAlphabetNow = isNamePlainAlphabet(firstNameToUse);

    if (isNamePlainAlphabetNow) return firstNameToUse;

    const purefirstNameToUse = await getNameToGreetWithFromAi(
      promptReturnPureFormOfTheName,
      firstNameToUse
    );

    return purefirstNameToUse;
  }

  const isNamePlainAlphabetNow = isNamePlainAlphabet(nameToCheck);

  console.log("isNamePlainAlphabetNowonly", isNamePlainAlphabetNow);

  if (isNamePlainAlphabetNow) return nameToCheck;

  const purefirstNameToUse = await getNameToGreetWithFromAi(
    promptReturnPureFormOfTheName,
    nameToCheck
  );

  return purefirstNameToUse;
}

function isNamePlainAlphabet(str) {
  const plainAlphabetRegex = /^[a-zA-Z]+$/;
  return plainAlphabetRegex.test(str);
}
