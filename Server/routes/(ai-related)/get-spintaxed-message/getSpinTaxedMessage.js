import express from "express";
import getStraightAiResponse from "../get-client-name/get-ai-response/getStraightAiResponse.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";

const getSpinTaxedMessageRouter = express.Router();

export const confirmNamePrompt = `Return "Yes" or "No" for this question.

Ignoring numbers or symbols in the name.

Is the name below likely a human name or a human nickname ?
`;

const thereText = "";

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

  console.log(
    "finalPhrasesToExcludeDuringSpintax",
    finalPhrasesToExcludeDuringSpintax
  );

  try {
    const promptToSpinTaxText = `spin tax the words not listed to be replaced in this message only.

Never change the structure of the message.

don't replace the following words : ${finalPhrasesToExcludeDuringSpintax}

Only return the spun text. Don't explain anything, don't prefix the spun text with any explanation or any revision.`;

    const spinTaxedMessage = await getStraightAiResponse(
      promptToSpinTaxText,
      messageToSpinTax
    );

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
