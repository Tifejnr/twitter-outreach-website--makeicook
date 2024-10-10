import checkAllNamesByEachOther from "./checkAllNamesByEachOther.js";

export default function findCommonName(names) {
  const finalNamesArray = checkAllNamesByEachOther(names);

  if (finalNamesArray.length == 1) {
    return finalNamesArray[0];
  } else {
    return finalNamesArray.join(", ");
  }
}
