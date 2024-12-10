import express from "express";

import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import getStraightAiResponse from "../get-client-name/get-ai-response/getStraightAiResponse.js";

const creditsIsZeroText = "Buy credits";

function getLastSalesCloserMessage(array) {
  // Find the last object where isItSalesCloserMessage is false
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i].isItSalesCloserMessage === true) {
      return array[i];
    }
  }
  // Return null if no matching object is found
  return null;
}
function getLastNonSalesCloserMessage(array) {
  // Find the last object where isItSalesCloserMessage is false
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i].isItSalesCloserMessage === false) {
      return array[i];
    }
  }
  // Return null if no matching object is found
  return null;
}

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

  // const conversation = allMessagesTextArray
  //   .map(
  //     ({ eachMessage, isItSalesCloserMessage }) =>
  //       `${
  //         isItSalesCloserMessage ? "Sales person : " : "Prospect : "
  //       }\n${eachMessage}`
  //   )
  //   .join("\n\n");

  const lastProspectMessageObj =
    getLastNonSalesCloserMessage(allMessagesTextArray);

  const lastSalesCloserMessageObj =
    getLastSalesCloserMessage(allMessagesTextArray);

  const lastProspectMessage = lastProspectMessageObj.eachMessage;
  const lastSalesCloserMessage = lastSalesCloserMessageObj.eachMessage;

  const lastConversations = `
Sales person message : ${lastSalesCloserMessage}

Prospect response : ${lastProspectMessage}
`;

  try {
    // Process messages

    // Loop through the aiChattingConfigsArray
    for (let aiChattingConfig of aiChattingConfigsArray) {
      const { title, condition, responseIftrue, myLastSentMessageFormat } =
        aiChattingConfig;

      if (condition === "") {
        continue;
      }

      const promptCheckIfMyLastMessageFormatIsOkay = ` Return "Yes" or "No" and your why .

      is this message 90% same format as this : 
      ${myLastSentMessageFormat}
       `;

      const responseIfFormatOfSalesPersonMessageMatches =
        await getStraightAiResponse(
          promptCheckIfMyLastMessageFormatIsOkay,
          lastSalesCloserMessage,
          temperature,
          maxTokens
        );

      console.log(
        "responseIfFormatOfSalesPersonMessageMatches",
        responseIfFormatOfSalesPersonMessageMatches,
        title,
        lastSalesCloserMessage
      );

      if (responseIfFormatOfSalesPersonMessageMatches.includes("No")) {
        continue;
      }

      const promptToKnow = `Return "Yes" or "No" only.       

From this conversation : ${lastConversations} 
${condition}`;
      const response = await getStraightAiResponse(
        promptToKnow,
        lastConversations,
        temperature,
        maxTokens
      );

      console.log("response ", response);

      // Stop the loop if "Yes" is found
      if (response.includes("Yes")) {
        return res.json({
          aiResponse: responseIftrue, // Return the exact responseIftrue
        });
      }
    }

    // If no "Yes" was found in the loop, return "None returned true"
    return res.json({
      aiResponse: "None returned true",
    });
  } catch (error) {
    console.log("error,", error);
    return res.json({ error: "Internal server error" });
  }
});

export default processChatsWithAiRouter;
