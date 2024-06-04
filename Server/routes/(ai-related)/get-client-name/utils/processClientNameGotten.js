import removeDuplicateWords from "./removeDublicateWords.js";
import isNameAdecimalNumber from "./isNameAdecimalNumber.js";
import forbiddenNamesInclusionArray from "../forbiddenNamesInclusion.js";
import forbiddenNames from "../forbiddenNames.js";
import removeAndTextFromClienName from "./removeAndTextFromClienName.js";

import containsOneCharacter from "./doesItContainOneXter.js";

export default function processClientNameGotten(clientNameResponseRaw) {
  let clientNameResponse = removeAndTextFromClienName(clientNameResponseRaw);

  const clientNameResponseLowercase = clientNameResponse.toLowerCase();

  const isForbiddenNameEqualtTo = forbiddenNames.find(
    (forbiddenName) =>
      forbiddenName.toLowerCase() == clientNameResponseLowercase
  );

  const isForbiddenNameIncludedIn = forbiddenNamesInclusionArray.find(
    (forbiddenName) =>
      new RegExp("\\b" + forbiddenName.toLowerCase() + "\\b").test(
        clientNameResponseLowercase
      )
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
