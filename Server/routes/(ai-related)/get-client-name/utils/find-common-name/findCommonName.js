import checkAllNamesByEachOther from "./checkAllNamesByEachOther.js";

export default function findCommonName(names) {
  console.log("incoming names to find common", names);
  const finalNamesArray = checkAllNamesByEachOther(names);

  if (finalNamesArray.length == 1) {
    return finalNamesArray[0];
  } else {
    return finalNamesArray.join(", ");
  }
}
