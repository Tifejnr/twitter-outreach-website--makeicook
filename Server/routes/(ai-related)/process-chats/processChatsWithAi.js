import express from "express";

import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import getStraightAiResponse from "../get-client-name/get-ai-response/getStraightAiResponse.js";

const creditsIsZeroText = "Buy credits";

function getLastSalesCloserMessage(array) {
  let lastTrueIndex = -1; // To track the last index where isItSalesCloserMessage === true
  let result = []; // To store the messages with isItSalesCloserMessage === false

  // Iterate through the array to find the last true index
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i].isItSalesCloserMessage === false && lastTrueIndex === -1) {
      lastTrueIndex = i; // Set the last true index
    }
    // If we've already found a true message and find a false one after it
    if (lastTrueIndex !== -1 && array[i].isItSalesCloserMessage === true) {
      result.unshift(array[i]); // Add the false message to the result
    }
  }

  // Join the text properties with a newline character
  return lastTrueIndex !== -1 ? result.map((item) => item.text).join("\n") : "";
}
function getLastNonSalesCloserMessage(array) {
  let lastTrueIndex = -1; // To track the last index where isItSalesCloserMessage === true
  let result = []; // To store the messages with isItSalesCloserMessage === false

  // Iterate through the array to find the last true index
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i].isItSalesCloserMessage === true && lastTrueIndex === -1) {
      lastTrueIndex = i; // Set the last true index
    }
    // If we've already found a true message and find a false one after it
    if (lastTrueIndex !== -1 && array[i].isItSalesCloserMessage === false) {
      result.unshift(array[i]); // Add the false message to the result
    }
  }

  // Join the text properties with a newline character
  return lastTrueIndex !== -1 ? result.map((item) => item.text).join("\n") : "";
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

  const lastProspectMessage =
    getLastNonSalesCloserMessage(allMessagesTextArray);

  const lastSalesCloserMessage =
    getLastSalesCloserMessage(allMessagesTextArray);

  const lastConversations = `
Sales person message : ${lastSalesCloserMessage}

Prospect response : ${lastProspectMessage}
`;

  console.log("lastConversations", lastConversations);

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

      is content of this message the almost the same with this except for minor changes?:
      ${myLastSentMessageFormat}
       `;

      const responseIfFormatOfSalesPersonMessageMatches =
        await getStraightAiResponse(
          promptCheckIfMyLastMessageFormatIsOkay,
          lastSalesCloserMessage,
          temperature,
          maxTokens
        );

      // console.log(
      //   "responseIfFormatOfSalesPersonMessageMatches",
      //   responseIfFormatOfSalesPersonMessageMatches,
      //   title,
      //   lastSalesCloserMessage
      // );

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
