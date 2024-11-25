import express from "express";

import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import getStraightAiResponse from "../get-client-name/get-ai-response/getStraightAiResponse.js";
import promptsObjsForCoverLetterOptimization from "./promptObjsForCoverLetterOptimizing.js";
import unwrapQuotes from "./utils/unwrappQuotes.js";
import getGreetingToStartWith from "./utils/getGreetingToStartWith.js";

const creditsIsZeroText = "Buy credits";

const optimizeCoverLetterOpeningRouter = express.Router();

optimizeCoverLetterOpeningRouter.post("/", async (req, res) => {
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

  const {
    fullCoverLetter,
    clientName,
    openingLineOfCoverLetter,
    jobDescription,
  } = bodyRequest;
  const { credits } = resultOfTokenValidation;

  const temperature = 0.8;
  const maxTokens = 1500;

  const greetingToStartWithNow = getGreetingToStartWith(clientName);

  try {
    //get client pain points from description
    const clientPainPointsRaw = await getStraightAiResponse(
      promptsObjsForCoverLetterOptimization.describeClientPainPoints,
      jobDescription,
      temperature,
      maxTokens
    );

    //check how irresistible the current opening line is.
    // const irresistibleVeridctFromAi = await getStraightAiResponse(
    //   promptsObjsForCoverLetterOptimization.irresistiabiltyRangeCheck,
    //   openingLineOfCoverLetter,
    //   temperature,
    //   maxTokens
    // );

    //craft 10/10 irresistible offer
    const promptForCraftingIrresisitibleOpening = `Putting the client pain point into context : ${clientPainPointsRaw}


Start with this greeting:${greetingToStartWithNow} 

${promptsObjsForCoverLetterOptimization.craftIrresistibleCoverLetterLastPart}
    `;
    const irresistibleOpeningLineCraftedByAiNow = await getStraightAiResponse(
      promptForCraftingIrresisitibleOpening,
      openingLineOfCoverLetter,
      temperature,
      maxTokens
    );

    const reducedTo250xters = await getStraightAiResponse(
      promptsObjsForCoverLetterOptimization.reduceTo250xters,
      irresistibleOpeningLineCraftedByAiNow,
      temperature,
      maxTokens
    );

    const withoutQotes = unwrapQuotes(reducedTo250xters);

    console.log("withoutQotes", withoutQotes);

    return res.json({
      optimizedOpeningLine: withoutQotes,
    });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

export default optimizeCoverLetterOpeningRouter;
