import express from "express";

import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import getStraightAiResponse from "../get-client-name/get-ai-response/getStraightAiResponse.js";
import promptsObjsForCoverLetterOptimization from "./promptObjsForCoverLetterOptimizing.js";

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

  const { fullCoverLetter, openingLineOfCoverLetter, jobDescription } =
    bodyRequest;
  const { credits } = resultOfTokenValidation;

  const temperature = 0.8;
  const maxTokens = 1500;

  try {
    //get client pain points from decription
    const clientPainPointsRaw = await getStraightAiResponse(
      promptsObjsForCoverLetterOptimization.describeClientPainPoints,
      jobDescription,
      temperature,
      maxTokens
    );

    //check how irresistible the current opening line is.
    const irresistibleVeridctFromAi = await getStraightAiResponse(
      promptsObjsForCoverLetterOptimization.irresistiabiltyRangeCheck,
      openingLineOfCoverLetter,
      temperature,
      maxTokens
    );

    //craft 10/10 irresistible offer
    const promptForCraftingIrresisitibleOpening = `Putting the client pain point into context : ${clientPainPointsRaw}

  This is the response you gave when I asked you to rate from 0-10 how irresistible my cover letter opening words were to a client who wants to hire someone.
 ${irresistibleVeridctFromAi}

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

    console.log("reducedTo250xters", reducedTo250xters);

    return res.json({
      optimizedOpeningLine: reducedTo250xters,
    });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

// function hasMoreThanThreeWords(text) {
//   // Split the text into words based on spaces and filter out any empty strings
//   const words = text.trim().split(/\s+/); // \s+ matches one or more spaces
//   return words.length > 3;
// }

function checkNameInText(name, incomingText) {
  // Step 1: Ensure the name is only separated by a comma (with optional spaces around it)
  const commaSeparatedPattern = /^\s*[^,]+,\s*[^,]+\s*$/;

  if (!commaSeparatedPattern.test(name)) {
    return false; // Return false if the name is not correctly separated by a comma
  }

  // Step 2: Remove the comma and trim the name
  const cleanedName = name.replace(",", "").trim();

  // Step 3: Trim the incoming text
  const trimmedText = incomingText.trim();

  // Step 4: Check if the trimmed text includes the cleaned name
  return trimmedText.includes(cleanedName);
}

export default optimizeCoverLetterOpeningRouter;

// https://www.upwork.com/jobs/~021839341791060043020  Can was chosen as name, use probabi;ity to filter it as a name
