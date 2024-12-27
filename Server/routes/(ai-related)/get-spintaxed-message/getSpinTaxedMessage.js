import express from "express";
import getStraightAiResponse from "../get-client-name/get-ai-response/getStraightAiResponse.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";

const getSpinTaxedMessageRouter = express.Router();

function removeSpunText(input, originalText) {
  const phraseToRemove = "Here:";
  const cleanedString = input.split(phraseToRemove).join(""); // Removes all occurrences of the phrase

  // Confirm the phrase "spun text" is no longer present
  if (cleanedString.includes("spun text")) {
    const spunTextPrefix2 = "Here:";

    const spinTaxedMessageSpunTextRemoved = input.replace(spunTextPrefix2, "");

    if (spinTaxedMessageSpunTextRemoved.includes("spun text")) {
      console.error(
        "Removal failed: 'spun text' is still present in the string.",
        input
      );
      return originalText; // Return null to indicate failure
    }

    return spinTaxedMessageSpunTextRemoved;
  }

  return cleanedString; // Return the cleaned string
}

function getRandomTemperature() {
  const min = 0.1;
  const max = 0.2;

  return Math.random() * (max - min) + min;
}

function formatPhrases(input) {
  // Split the input string by commas and trim each phrase
  const phrases = input.split(",").map((phrase) => phrase.trim());

  // Map each phrase into the desired format
  const formattedLines = phrases.map((phrase) => `Do not replace "${phrase}" `);

  // Join the lines with newlines
  return formattedLines.join("\n");
}

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

  const { finalPhrasesToExcludeDuringSpintax, messageToSpinTax } = bodyRequest;

  const phrasesOnNewLine = formatPhrases(
    finalPhrasesToExcludeDuringSpintax.trim()
  );
  let finalMessageToSpintax;

  const firstParagrapgh = getFirstParagraph(messageToSpinTax);

  if (firstParagrapgh) {
    finalMessageToSpintax = messageToSpinTax.replace(firstParagrapgh, "");
  } else {
    finalMessageToSpintax = messageToSpinTax;
  }

  // console.log("phrasesOnNewLine", phrasesOnNewLine);

  try {
    const promptToSpinTaxText = `
Do not change the structure of the message.

Do not replace any human name.

Do not replace "{name}".  

${phrasesOnNewLine}
    
Spintax 4 words in this message except the words I told you not to replace above.


Be very calm.  Don't spintax with words a 3 year old won't understand, choose the simplest words for spintax.  

Don't spintax with agrressive words. Don't be too casual.

Only return the spun text prefixing it with "Here:" `;

    const spinTaxedMessageRaw = await getStraightAiResponse(
      promptToSpinTaxText,
      finalMessageToSpintax,
      getRandomTemperature()
    );

    const spinTaxedMessage = removeSpunText(
      spinTaxedMessageRaw,
      finalMessageToSpintax
    );

    const firstParagraphAddedBack = `${firstParagrapgh}
    
${spinTaxedMessage}`;

    //return final shit still
    return res.json({
      spinTaxedMessage: firstParagrapgh
        ? firstParagraphAddedBack
        : spinTaxedMessage,
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
