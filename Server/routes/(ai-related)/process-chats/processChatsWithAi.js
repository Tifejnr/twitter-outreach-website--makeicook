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

  const { allMessagesTextArray, aiChattingConfigsArray } = bodyRequest;
  const { credits } = resultOfTokenValidation;

  const temperature = 0.1;
  const maxTokens = 1500;

  const conversation = allMessagesTextArray
    .map(
      ({ eachMessage, isItSalesCloserMessage }) =>
        `${
          isItSalesCloserMessage ? "Sales person:" : "Prospect:"
        }\n${eachMessage}`
    )
    .join("\n\n");

  console.log("conversation", conversation);

  try {
    //process messages

    // Loop through the tweetConditions array
    for (let aiChattingConfig of aiChattingConfigsArray) {
      const { condition, responseIftrue } = aiChattingConfig;

      const promptToKnow = `This is a conversation between a sales person and a prospect.

  Return "Yes" or "No" only.
 
  ${condition}
  `;
      const response = await getStraightAiResponse(
        promptToKnow,
        conversation,
        temperature,
        maxTokens
      );

      responsesArray.push(response);

      // Stop the loop if "Yes" is found
      if (response.includes("Yes")) {
        return res.json({
          aiResponse: responseIftrue,
        });
      }
    }

    // If no "Yes" was found in the loop, return "No"
    return res.json({
      aiResponse: "None returned true",
    });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

export default processChatsWithAiRouter;