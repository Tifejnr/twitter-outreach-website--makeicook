import combineArrayOfStringsToOneArray from "./combineArrayOfStringsToOneArray";

export default function processLastPickWordsSynLongerVersion(
  latestWordSynonmyArray,
  wordSynonymObjArrayLongerVersion
) {
  const fullLengthArray = combineArrayOfStringsToOneArray(
    latestWordSynonmyArray,
    wordSynonymObjArrayLongerVersion
  );

  if (fullLengthArray.length > 15) {
    fullLengthArray.splice(15); // Keeps only the first 15 elements
  }
  return fullLengthArray;
}
