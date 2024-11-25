import express from "express";

import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import getStraightAiResponse from "../get-client-name/get-ai-response/getStraightAiResponse.js";
import promptsObjsForCoverLetterOptimization from "./promptObjsForCoverLetterOptimizing.js";
import unwrapQuotes from "./utils/unwrappQuotes.js";
import getGreetingToStartWith from "./utils/getGreetingToStartWith.js";

const creditsIsZeroText = "Buy credits";
const youFocusApproachFormat = `
Hi, you need a storyteller who can unravel intricate concepts and ignite action in your readers to make them buy more of you stories.
`;

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

    console.log("clientPainPointsRaw", clientPainPointsRaw);

    const craftIrresistibleCoverLetterLastPart = `Using the pain point "${clientPainPointsRaw}" to grab the client attention.

    a "You focus" approach must start with "You need", followed by demonstrating you understand the client pain point.
    
    Use a "You focus" approach to restate the client pain point to prove you understand exactly what the client wants.
    
    craft a 10/10 irrestitble cover letter opening for me.
    
    Keep your crafted cover letter opening within 250 characters.
    
    Ensure it follow this format   "${youFocusApproachFormat}" but with the pain point "${clientPainPointsRaw}" being addressed. 
    
    Only return the cover letter opening you crafted. don't explain anything, don't prefix the main cover letter with any explanantion or any revision.
    `;
    const promptForCraftingIrresisitibleOpening = `

You must start the cover letter with this greeting: ${greetingToStartWithNow} 


Client pain point : ${clientPainPointsRaw}

${craftIrresistibleCoverLetterLastPart}
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
