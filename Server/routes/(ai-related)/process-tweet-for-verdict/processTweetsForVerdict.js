import express from "express";
import getStraightAiResponse from "../get-client-name/get-ai-response/getStraightAiResponse.js";

const processTweetsForVerdictRouter = express.Router();

processTweetsForVerdictRouter.post("/", async (req, res) => {
  const bodyRequest = await req.body;

  // const resultOfTokenValidation = await isTokenValid(bodyRequest);

  // if (resultOfTokenValidation.nullJWTToken)
  //   return res.json({ nullJWTToken: true });

  // if (resultOfTokenValidation.invalidToken)
  //   return res.json({ invalidToken: true });

  // if (resultOfTokenValidation.blacklistedEmail) {
  //   console.log("blacklistedEmail", resultOfTokenValidation.blacklistedEmail);
  //   return res.json({
  //     clientNameResponse: "Hadhri",
  //   });
  // }

  const { tweetConditionsArray, mainQuestionPerTweeter } = bodyRequest;

  console.log("bodyRequest", bodyRequest);

  // const mainquestajajajj =
  //   "does this tweet sounds like tweeter freelances on Upwork ?";

  try {
    let responsesArray = [];

    // Loop through the nameParts array
    for (let tweetCondition of tweetConditionsArray) {
      const promptHeadingForTweetsProcessing = `
      Only return "Yes", "No" or "Null".
  
      ${tweetCondition}
  
  ${mainQuestionPerTweeter}`;

      const response = await getStraightAiResponse(
        promptHeadingForTweetsProcessing,
        tweet
      );

      responsesArray.push(response);
    }

    console.log("responsesArrya", responsesArray);

    //check if yes was found

    const isYesFound = responsesArray.find(
      (eachResponse) => eachResponse == "Yes"
    );

    if (isYesFound) {
      console.log("Yeah, an upwork freelancer oooo");

      return res.json({
        verdict: "Yes",
      });
    }

    //return final shit still
    return res.json({
      verdict: "No",
    });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

export default processTweetsForVerdictRouter;
