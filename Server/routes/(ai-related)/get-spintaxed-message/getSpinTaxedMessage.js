import express from "express";
import getStraightAiResponse from "../get-client-name/get-ai-response/getStraightAiResponse.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";

const getSpinTaxedMessageRouter = express.Router();

const returnOnlySpunText = `Note : Don't explain anything in your response. 

Note : Don't put any Note in your response. 

Only return the spun text prefixing it with "Here is the spun text : "

alone only.`;

function getRandomTemperature() {
  const min = 0.5;
  const max = 0.9;

  return Math.random() * (max - min) + min;
}

function formatPhrases(input) {
  // Split the input string by commas and trim each phrase
  const phrases = input.split(",").map((phrase) => phrase.trim());

  // Map each phrase into the desired format
  const formattedLines = phrases.map(
    (phrase) =>
      `Important note: "${phrase}" is immutable and must remain exactly as it is. Do not replace or change it.`
  );

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

  // console.log("phrasesOnNewLine", phrasesOnNewLine);

  try {
    const promptToSpinTaxText = `spintax the words not listed to be replaced in this message only.

Do not change the structure of the message.

Do not replace any human name.

Do not replace "{name}".

${phrasesOnNewLine}

Be very professional.  Don't spintax with words a 3 year old won't understand, choose the simplest words for spintax.  

Only return the spun text prefixing it with "Here is the spun text :"`;

    const spinTaxedMessageRaw = await getStraightAiResponse(
      promptToSpinTaxText,
      messageToSpinTax,
      getRandomTemperature()
    );

    const spunTextPrefix = "Here is the spun text :";

    const spinTaxedMessage = spinTaxedMessageRaw.replace(spunTextPrefix, "");

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

export default getSpinTaxedMessageRouter;
