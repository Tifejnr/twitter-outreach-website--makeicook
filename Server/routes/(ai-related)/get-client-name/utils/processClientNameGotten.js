import isNameAdecimalNumber from "./isNameAdecimalNumber.js";
import forbiddenNamesInclusionArray from "../forbiddenNamesInclusion.js";
import forbiddenNames from "../forbiddenNames.js";

import containsOneCharacter from "./doesItContainOneXter.js";

export default function processClientNameGotten(clientNameResponseRaw) {
  // let clientNameResponse = removeAndTextFromClienName(clientNameResponseRaw);

  let clientNameResponse = clientNameResponseRaw.replace(/\s{2,}/g, " ");

  const clientNameResponseLowercase = clientNameResponse.toLowerCase();

  const isForbiddenNameEqualtTo = forbiddenNames.find(
    (forbiddenName) =>
      forbiddenName.toLowerCase() == clientNameResponseLowercase
  );

  const isForbiddenNameIncludedIn = forbiddenNamesInclusionArray.find(
    (forbiddenName) => {
      const escapedForbiddenName = forbiddenName
        .toLowerCase()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedForbiddenName}\\b`);
      return regex.test(clientNameResponseLowercase);
    }
  );

  const doesItContainOneXter = containsOneCharacter(
    clientNameResponseLowercase
  );

  const isNameDecimal = isNameAdecimalNumber(clientNameResponseLowercase);

  if (
    isForbiddenNameIncludedIn ||
    isForbiddenNameEqualtTo ||
    doesItContainOneXter ||
    isNameDecimal ||
    clientNameResponse.includes("ignored")
  ) {
    clientNameResponse = "Hi there";
  }

  const cleanedClientName = clientNameResponse;

  return cleanedClientName;
}
