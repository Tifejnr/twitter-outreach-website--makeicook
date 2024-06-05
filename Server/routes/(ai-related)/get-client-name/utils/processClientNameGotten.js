import isNameAdecimalNumber from "./isNameAdecimalNumber.js";
import forbiddenNamesInclusionArray from "../forbiddenNamesInclusion.js";
import forbiddenNames from "../forbiddenNames.js";

import containsOneCharacter from "./doesItContainOneXter.js";
import removeDuplicateWords from "./removeDublicateWords.js";
import getTotalWordsLength from "./getTotalWordsLength.js";

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

  const isNameEmoji = isAllEmojis(clientNameResponseLowercase);

  if (
    isForbiddenNameIncludedIn ||
    isForbiddenNameEqualtTo ||
    doesItContainOneXter ||
    isNameDecimal ||
    isNameEmoji ||
    clientNameResponse.includes("ignored")
  ) {
    clientNameResponse = "Hi there";
  }

  clientNameResponse = removeDuplicateWords(clientNameResponse);

  const clientNameResponseLength = getTotalWordsLength(clientNameResponse);

  if (clientNameResponseLength > 4) {
    clientNameResponse = "client name is greater than 4";
  }

  const cleanedClientName = clientNameResponse;

  return cleanedClientName;
}

function isAllEmojis(input) {
  // Regular expression to match most emojis
  const emojiRegex =
    /^(?:[\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C\uD000-\uDBFF\uDFFF\uE000-\uFFFF]|[\u2600-\u26FF\uD83C\uDD70-\uD83C\uDE51]|[\uD83E\uDD10-\uD83E\uDDFF])+$/;

  return emojiRegex.test(input);
}
