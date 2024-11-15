import express from "express";
import getStraightAiResponse from "../get-client-name/get-ai-response/getStraightAiResponse.js";
import convertArrayToTweets from "./utils/convertArrayToTweets.js";

const getTweeterProfilePersonaRouter = express.Router();

getTweeterProfilePersonaRouter.post("/", async (req, res) => {
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

  const { bioText, tweetsRetweetDetails } = bodyRequest;
  const { tweetsTextArray, retweetsTextArray } = tweetsRetweetDetails;

  const userTweets = convertArrayToTweets(tweetsTextArray, "Tweet");
  const userRetweets = convertArrayToTweets(tweetsTextArray, "Endorsed tweet");

  // const mainquestajajajj =
  //   "does this tweet sounds like tweeter freelances on Upwork ?";

  // const onlyServiceoFfered = `"if the tweet is only stating the service offered, e.g web developer return Yes else return null"`;
  let personaFromBio = "",
    personaFromTweets = "",
    personaFromReTweets = "";
  try {
    if (bioText !== "") {
      personaFromBio = await getStraightAiResponse(
        promptObjGetTweeterPersona.getUserEgoFromBio,
        bioText
      );
    }

    if (userTweets.length > 0) {
      personaFromTweets = await getStraightAiResponse(
        promptObjGetTweeterPersona.getUserInterestAndStruggleFromTweets,
        userTweets
      );
    }
    if (userRetweets.length > 0) {
      personaFromReTweets = await getStraightAiResponse(
        promptObjGetTweeterPersona.getUserInterestAndStruggleFromRetweets,
        userRetweets
      );
    }

    return res.json({
      personaFromBio,
      personaFromTweets,
      personaFromReTweets,
    });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

export default getTweeterProfilePersonaRouter;
