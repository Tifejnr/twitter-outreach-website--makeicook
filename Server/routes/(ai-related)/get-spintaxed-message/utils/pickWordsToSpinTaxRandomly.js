import convertArrayOfStringToCommSepertedString from "./convertArrayOfStringToCommSepertedString.js";

function shouldPickingBeStrict() {
  return Math.random() < 0.5;
}

export default function pickWordsToSpinTaxRandomly(
  sentence,
  excludedWordsArray,
  phrasesToExcludeByForceArray,
  lastPickedWordsArray
) {
  for (let phrasesToExcludeByForce of phrasesToExcludeByForceArray) {
    sentence = sentence.replace(phrasesToExcludeByForce, "");
  }

  const allExcludedArrayInLowerCase = excludedWordsArray.map((eachWord) => {
    return eachWord.trim().toLowerCase();
  });

  const excludedWordsArrayToString = convertArrayOfStringToCommSepertedString(
    allExcludedArrayInLowerCase
  );
  // Split the sentence into words
  const words = sentence.split(" ").filter((word) => word.length > 0);

  // Filter out the excluded words (case-insensitive)
  const filteredWords = words.filter(
    (word) => !excludedWordsArrayToString.includes(word.trim().toLowerCase())
  );

  // If there are fewer than 4 filtered words, return them all
  if (filteredWords.length < 4) {
    console.log("pickedWords (all filtered words)", filteredWords);
    return filteredWords;
  }

  // Calculate 30% of the filtered words, rounded up, but not more than 5
  const numToPick = Math.min(Math.ceil(filteredWords.length * 0.4), 7);

  // If there are fewer words than numToPick, return them all
  if (filteredWords.length <= numToPick) {
    return filteredWords;
  }

  const dontBeStrict = shouldPickingBeStrict();

  if (dontBeStrict) {
    // Randomly select the required number of words
    const pickedWords = [];
    while (pickedWords.length < numToPick) {
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      const word = filteredWords[randomIndex];
      if (!pickedWords.includes(word)) {
        pickedWords.push(word);
      }
    }

    console.log("pickedWords  ,No stictness", pickedWords);
    return pickedWords;
  }

  // Randomly select the required number of words
  const pickedWords = [];
  const availableWords = filteredWords.filter(
    (word) => !lastPickedWordsArray.includes(word)
  ); // Words not in lastPickedWordsArray

  // Pick from availableWords first
  while (pickedWords.length < numToPick && availableWords.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const word = availableWords[randomIndex];
    pickedWords.push(word);
    availableWords.splice(randomIndex, 1); // Remove picked word to avoid duplicates
  }

  // If more words are needed, pick from lastPickedWordsArray
  const remainingWordsNeeded = numToPick - pickedWords.length;
  if (remainingWordsNeeded > 0) {
    const additionalWords = lastPickedWordsArray.filter(
      (word) => !pickedWords.includes(word)
    );
    while (pickedWords.length < numToPick && additionalWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * additionalWords.length);
      const word = additionalWords[randomIndex];
      pickedWords.push(word);
      additionalWords.splice(randomIndex, 1); // Remove picked word to avoid duplicates
    }
  }

  console.log("pickedWords strict", pickedWords);
  return pickedWords;
}
