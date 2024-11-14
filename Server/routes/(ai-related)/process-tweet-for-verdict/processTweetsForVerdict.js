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

  const { details, tweet } = bodyRequest;

  const {
    tweetConditionsForYesOrNoVerdictArray,
    mainQuestionToCheckCondition,
  } = details;

  // const mainquestajajajj =
  //   "does this tweet sounds like tweeter freelances on Upwork ?";

  const onlyServiceoFfered = `"if the tweet is only stating the service offered, e.g web developer return No, else return null"`;

  try {
    let responsesArray = [];

    let isServiceoFferedOnlyResponse = "No";

    // Loop through the tweetConditions array
    for (let tweetCondition of tweetConditionsForYesOrNoVerdictArray) {
      const promptHeadingForTweetsProcessing = `
        Only return "Yes", "No" or "Null".
    
        ${tweetCondition}
    
        ${mainQuestionToCheckCondition}`;

      const response = await getStraightAiResponse(
        promptHeadingForTweetsProcessing,
        tweet
      );

      if (tweetCondition == onlyServiceoFfered) {
        isServiceoFferedOnlyResponse = response;
      }

      responsesArray.push(response);

      // Stop the loop if "Yes" is found
      if (
        response.includes("Yes") &&
        !isServiceoFferedOnlyResponse.includes("Yes")
      ) {
        // console.log("Yeah, an Upwork freelancer!");

        if (onlyServiceoFfered)
          return res.json({
            verdict: "Yes",
          });
      }
    }

    // If no "Yes" was found in the loop, return "No"
    return res.json({
      verdict: "No",
    });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

export default processTweetsForVerdictRouter;
