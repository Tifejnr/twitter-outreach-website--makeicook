export default function matchWordsAndSynonymsArrayToObjArray(
  wordsArray,
  synonymArray
) {
  // Check if arrays are of equal length
  if (wordsArray.length !== synonymArray.length) {
    console.log(
      "legth not same wordsArray, synonymArray",
      wordsArray,
      synonymArray
    );
    return wordsArray;
  }

  // Initialize the result array
  const result = [];

  // Iterate through the arrays and create the objects
  for (let i = 0; i < wordsArray.length; i++) {
    result.push({
      word: wordsArray[i],
      synonym: synonymArray[i],
    });
  }

  // Return the resulting array of objects
  return result;
}
