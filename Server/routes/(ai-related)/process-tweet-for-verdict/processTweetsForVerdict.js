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

  const { details, tweet, isItReplyToTweet } = bodyRequest;

  const {
    tweetConditionsForYesOrNoVerdictArray,
    mainQuestionToCheckCondition,
  } = details;

  // const mainquestajajajj =
  //   "does this tweet sounds like tweeter freelances on Upwork ?";

  // const onlyServiceoFfered = `"if the tweet is only stating the service offered, e.g web developer return Yes else return null"`;

  const postedTweetIfItWasReplyPattern = isItReplyToTweet;

  try {
    let responsesArray = [];

    let isServiceoFferedOnlyResponse = "No";

    // Loop through the tweetConditions array
    for (let tweetCondition of tweetConditionsForYesOrNoVerdictArray) {
      const promptHeadingForTweetsProcessing = `
        Only return "Yes", "No" or "Null".
    
        ${tweetCondition}
    
        ${mainQuestionToCheckCondition}`;

      const promptHeadingForRepliesProcessing = `
        Only return "Yes", "No" or "Null".

        Putting this tweet that this user replied to in context :
      
        ${postedTweetIfItWasReplyPattern}

    
        ${tweetCondition}
    
        ${mainQuestionToCheckCondition}`;

      const response = await getStraightAiResponse(
        isItReplyToTweet
          ? promptHeadingForRepliesProcessing
          : promptHeadingForTweetsProcessing,
        tweet
      );

      // if (tweetCondition == onlyServiceoFfered) {
      //   isServiceoFferedOnlyResponse = response;
      // }

      responsesArray.push(response);

      // Stop the loop if "Yes" is found
      if (response.includes("Yes")) {
        // console.log("Yeah, an Upwork freelancer!");

        // if (onlyServiceoFfered) {

        // }
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

`

If the tweet does not contain any language that suggests the tweeter is a freelancer on Upwork return No else return null.  
****  
If the tweet provides a link to the user's Upwork profile return Yes else return null.  
****  
If the tweet sounds like tweeter is just recommending Upwork return No else return null.  
****  
If the tweet sounds like tweeter is just telling people to join Upwork return No else return null.  
****  
If the tweet sounds like tweeter is not a big fan of Upwork return No else return null.  
****  
If the tweet sounds like tweeter hires others on Upwork return No else return null.  
****  
If the tweet sounds like tweeter has given up on Upwork return No else return null.  
****  
If the tweet sounds like tweeter is telling others to check a job posted on Upwork return No else return null.  
****  
If the tweet sounds like tweeter is saying he wants to try working on Upwork return No else return null.  
****  
If the tweet sounds like tweeter says Upwork is too hard return No else return null.  
****  
If the tweet sounds like tweeter who is complaining about Upwork hires people on Upwork return No else return null.  
****  
If the tweet sounds like tweeter is complaining about how Upwork isn't suitable for hiring or job post price is high return No else return null.  
****  
If the tweet sounds like it is not related to Upwork freelancing just #Upwork hashtag return No else return null.  
****  
If the tweet doesn't have Upwork as a keyword in it return No else return null.  
****  
If the tweet sounds like tweeter is advertising Upwork as a platform for finding talents with skills to hire return No else return null.  
****  
If the tweet sounds like tweeter is complaining about Upwork freelancers return No else return null.  
****  
If the tweet sounds like tweeter is just telling people to consider joining Upwork return No else return null.  
****  
If the tweet sounds like tweeter is just telling people about a job post on Upwork return No else return null.  
****  
If the tweet sounds like tweeter is just seeking a talent to hire on Upwork return No else return null.  
****  
If the tweet sounds like tweeter is saying Upwork blocked his/her account return No else return null.  
****  
If the tweet sounds like tweeter is saying there's talent on Upwork return No else return null.  
****  
If the tweet sounds like tweeter is saying he has quit Upwork return No else return null.  
****  
If the tweet sounds like tweeter is saying Upwork rejected him/her return No else return null.  
****  
If the tweet sounds like tweeter is complaining about Upwork not verifying his/her account return No else return null.  
****  
If the tweet sounds like tweeter wants to hire on Upwork return No else return null.  
****  
If the tweet sounds like tweeter is telling others that they can find jobs on Upwork return No else return null.  
****  
If the tweet sounds like tweeter is complaining about his/her Upwork account being blocked return No else return null.  
****  
If the tweet sounds like Upwork account got blocked return No else return null.  
****  
If the tweet sounds like tweeter has ever got paid through Upwork return Yes else return null.  
****  
If the tweet sounds like tweeter is complaining about Upwork return Yes else return null.  
****  
If the tweet sounds like tweeter is explaining something about Upwork e.g. connects JSS return Yes else return null.  
****  
If the tweet sounds like tweeter is just greeting or congratulating return No else return null.  
****  
If the tweet contains Upwork or top rated return Yes else return null.  
****  
If the tweet is only stating the service offered, e.g web developer return No, else return null.
`;
