import express from "express";

import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import getStraightAiResponse from "../get-client-name/get-ai-response/getStraightAiResponse.js";

const creditsIsZeroText = "Buy credits";
const youFocusApproachFormat = `
{Greeting} you need {address client pain point}

"you need" is a must, after greeting.
`;

const processChatsWithAiRouter = express.Router();

processChatsWithAiRouter.post("/", async (req, res) => {
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

  const { allMessagesTextArray } = bodyRequest;
  const { credits } = resultOfTokenValidation;

  const temperature = 0.1;
  const maxTokens = 1500;

  const conversation = allMessagesTextArray
    .map(
      ({ eachMessage, isItSalesCloserMessage }) =>
        `${
          isItSalesCloserMessage ? "Sales closer:" : "Prospect:"
        }\n${eachMessage}`
    )
    .join("\n\n");

  const promptToKnow = `
  This is a conversation between a sales closer and a prospect.

  Return "Yes" or "No" and why only.

  Does it look like the prospect is asking the sales closer to go ahead and send the questions ?
  `;

  console.log("conversation", conversation);

  try {
    //get client pain points from description
    const aiResponse = await getStraightAiResponse(
      promptToKnow,
      conversation,
      temperature,
      maxTokens
    );

    console.log("aiResponse", aiResponse);

    return res.json({ aiResponse });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

export default processChatsWithAiRouter;
