import express from "express";
import getStraightAiResponse from "../get-client-name/get-ai-response/getStraightAiResponse.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import replaceWordsWithSynonyms from "./utils/replaceWordsWithSynonyms.js";
import convertCommaSeperatedStringToArray from "./utils/convertCommaSeperatedStringToArray.js";
import combineArrayOfStringsToOneArray from "./utils/combineArrayOfStringsToOneArray.js";
import wordsPhrasesToNeverSpinTax from "./wordsPhrasesToNeverSpinTax.js";
import pickWordsToSpinTaxRandomly from "./utils/pickWordsToSpinTaxRandomly.js";
import matchWordsAndSynonymsArrayToObjArray from "./utils/matchWordsAndSynonymsArrayToObjArray.js";
import getRandomtemperature from "./utils/getRandomtemperature.js";
import getRandomCopywriterName from "./utils/getRandomCopywriterName.js";
import getCorrectWordCasing from "./utils/getCorrectWordCasing.js";
import user from "../../../server-utils/database/usersDb.js";
import processLastPickWordsSynLongerVersion from "./utils/processLastPickWordsSynLongerVersion.js";

const getSpinTaxedMessageRouter = express.Router();

getSpinTaxedMessageRouter.post("/", async (req, res) => {
  const bodyRequest = await req.body;

  const resultOfTokenValidation = await isTokenValid(bodyRequest);

  if (resultOfTokenValidation.nullJWTToken)
    return res.json({ nullJWTToken: true });

  if (resultOfTokenValidation.invalidToken)
    return res.json({ invalidToken: true });

  if (resultOfTokenValidation.blacklistedEmail) {
    console.log("blacklistedEmail", resultOfTokenValidation.blacklistedEmail);
    return res.json({
      clientNameResponse: "Hadhri",
    });
  }

  const { decodedPayload } = resultOfTokenValidation;
  const accountUser = await user.findById(decodedPayload._id);

  const { temporarillyStoredMessageSpinTaxParams } = accountUser;

  const {
    lastPickedObjWordsAndSynonymArray,
    lastPickedGreatWriterName,
    lastPickedTemperatureForMessageSpinTax,
    lastPickedObjWordsAndSynonymArrayLongerVersion,
  } = temporarillyStoredMessageSpinTaxParams;

  const { finalPhrasesToExcludeDuringSpintax, messageToSpinTax } = bodyRequest;

  const phrasesToExcludeArray = convertCommaSeperatedStringToArray(
    finalPhrasesToExcludeDuringSpintax
  );

  try {
    const excludedWordsArray = combineArrayOfStringsToOneArray(
      wordsPhrasesToNeverSpinTax,
      phrasesToExcludeArray
    );

    const isLuckyNo0Point9Picked = getRandomtemperature(
      lastPickedTemperatureForMessageSpinTax
    );

    if (isLuckyNo0Point9Picked == 0.9) {
      //return final shit still
      res.json({
        spinTaxedMessage: messageToSpinTax,
      });
      return;
    }

    const lastPickedWordsArray = lastPickedObjWordsAndSynonymArray.map(
      (eachSynomyPlusWordObj) => {
        return eachSynomyPlusWordObj.word;
      }
    );

    const randomWordsPicked = pickWordsToSpinTaxRandomly(
      messageToSpinTax,
      excludedWordsArray,
      phrasesToExcludeArray,
      lastPickedWordsArray
    );

    const wordsToFindSynonmy = randomWordsPicked;
    const bestWriterName = getRandomCopywriterName(lastPickedGreatWriterName);

    const spinTaxTemperature = getRandomtemperature(
      lastPickedTemperatureForMessageSpinTax
    );

    const lastPickedObjWordsAndSynonymArrayLOngerVersionNow =
      processLastPickWordsSynLongerVersion(
        lastPickedObjWordsAndSynonymArray,
        lastPickedObjWordsAndSynonymArrayLongerVersion
      );

    const synonymsArray = await Promise.all(
      wordsToFindSynonmy.map(async (word) => {
        try {
          const wordWasUsedLastTime =
            lastPickedObjWordsAndSynonymArrayLOngerVersionNow.find(
              (wordSynonymObj) => wordSynonymObj.word.trim() == word.trim()
            );

          let noteAboutEsuringADifferentSynonymIsOutputed = "";

          if (wordWasUsedLastTime) {
            noteAboutEsuringADifferentSynonymIsOutputed = `Note : " ${wordWasUsedLastTime.synonym} " cannot be a synonym in this context`;
          }

          const promptToSpinTaxTest = `Putting how "${word}" was used in this message : " ${messageToSpinTax} "

Acting like you are ${bestWriterName}

Return its synonym that won't change the message.

${noteAboutEsuringADifferentSynonymIsOutputed}

If the word does not have an exact synonym that won't change the message, you must return the word itself.

Your response should be the synonym for the word or the word only.


You must not prefix your response with any text.

Only return the synonym for the word or the word.

Your response must be one word.

Your response must be one word.

`;

          const response = await getStraightAiResponse(
            promptToSpinTaxTest,
            word,
            spinTaxTemperature,
            1500
          );

          const correctCasing = getCorrectWordCasing(word, response.trim());
          return correctCasing;
        } catch (error) {
          console.error(`Error fetching synonym for "${word}":`, error);
          return word; // Return null or handle missing synonyms
        }
      })
    );

    console.log("synonymsArray", synonymsArray);

    const objWordsAndSynonymArray = matchWordsAndSynonymsArrayToObjArray(
      wordsToFindSynonmy,
      synonymsArray
    );

    const spinTaxedMessage = replaceWordsWithSynonyms(
      messageToSpinTax,
      objWordsAndSynonymArray
    );

    console.log("spinTaxedMessage", spinTaxedMessage);

    const temporarillyStoredMessageSpinTaxParamsNow = {
      lastPickedGreatWriterName: bestWriterName,
      lastPickedTemperatureForMessageSpinTax: spinTaxTemperature,
      lastPickedObjWordsAndSynonymArray: objWordsAndSynonymArray,
      lastPickedObjWordsAndSynonymArrayLongerVersion:
        lastPickedObjWordsAndSynonymArrayLOngerVersionNow,
    };

    accountUser.temporarillyStoredMessageSpinTaxParams =
      temporarillyStoredMessageSpinTaxParamsNow;

    await accountUser.save();

    //return final shit still
    return res.json({
      spinTaxedMessage,
      isItError: spinTaxedMessage.includes("error"),
    });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

function getFirstParagraph(inputString) {
  // Check if the string contains a double-spaced new line
  const paragraphDelimiter = /\n\s*\n/;

  if (paragraphDelimiter.test(inputString)) {
    // Split the string into paragraphs
    const paragraphs = inputString.split(paragraphDelimiter);
    // Return the first paragraph
    return paragraphs[0];
  }

  // If no double-spaced new line is found, return false
  return false;
}

export default getSpinTaxedMessageRouter;
