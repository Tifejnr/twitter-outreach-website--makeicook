import removeDuplicateWords from "./removeDuplicateWords.js";
import isNameAdecimalNumber from "./isNameAdecimalNumber.js";
import forbiddenNamesInclusionArray from "../forbiddenNamesInclusion.js";
import forbiddenNames from "../forbiddenNames.js";
import removeAndTextFromClienName from "./removeAndTextFromClienName.js";
import containsOneCharacter from "./doesItContainOneXter.js";

export default function processClientNameGotten(clientNameResponseRaw) {
  let clientNameResponse = removeAndTextFromClienName(clientNameResponseRaw);
  clientNameResponse = clientNameResponse.replace(/\s{2,}/g, " ");

  const clientNameResponseLowercase = clientNameResponse.toLowerCase();

  const isForbiddenNameEqualTo = forbiddenNames.find(
    (forbiddenName) =>
      forbiddenName.toLowerCase() === clientNameResponseLowercase
  );

  const isForbiddenNameIncludedIn = forbiddenNamesInclusionArray.find(
    (forbiddenName) =>
      new RegExp(
        "\\b" +
          forbiddenName.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
          "\\b"
      ).test(clientNameResponseLowercase)
  );

  const doesItContainOneXter = containsOneCharacter(
    clientNameResponseLowercase
  );

  const isNameDecimal = isNameAdecimalNumber(clientNameResponseLowercase);

  if (
    isForbiddenNameIncludedIn ||
    isForbiddenNameEqualTo ||
    doesItContainOneXter ||
    isNameDecimal ||
    clientNameResponse.includes("ignored")
  ) {
    clientNameResponse = "Hi there";
  }

  const cleanedClientName = removeDuplicateWords(clientNameResponse);

  return cleanedClientName;
}
