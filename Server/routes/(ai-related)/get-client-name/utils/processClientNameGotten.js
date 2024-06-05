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
    /^(?:[\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638\u2639\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299\uD83C\uDC04\uD83C\uDCCF\uD83C\uDD70-\uD83C\uDD71\uD83C\uDD7E\uD83C\uDD7F\uD83C\uDD8E\uD83C\uDD91-\uD83C\uDD9A\uD83C\uDDE6-\uD83C\uDDFF\uD83C\uDE01\uD83C\uDE02\uD83C\uDE1A\uD83C\uDE2F\uD83C\uDE32-\uD83C\uDE3A\uD83C\uDE50\uD83C\uDE51\uD83C\uDF00-\uD83D\uDDFF\uD83D\uDE00-\uD83D\uDE4F\uD83D\uDE80-\uD83D\uDEF6\uD83D\uDFE0-\uD83D\uDFEB\uD83E\uDD00-\uD83E\uDDFF\uD83E\uDE70-\uD83E\uDEFF\uD83E\uDF00-\uD83E\uDFFF])+$/;

  return emojiRegex.test(input);
}
