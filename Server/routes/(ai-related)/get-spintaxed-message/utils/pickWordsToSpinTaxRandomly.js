import convertArrayOfStringToCommSepertedString from "./convertArrayOfStringToCommSepertedString.js";

export default function pickWordsToSpinTaxRandomly(
  sentence,
  excludedWordsArray,
  phrasesToExcludeByForceArray
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

  // Randomly select the required number of words
  const pickedWords = [];
  while (pickedWords.length < numToPick) {
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    const word = filteredWords[randomIndex];
    if (!pickedWords.includes(word)) {
      pickedWords.push(word);
    }
  }

  console.log("pickedWords", pickedWords);

  return pickedWords;
}
