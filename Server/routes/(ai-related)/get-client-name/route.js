import express from "express";
import { HfInference } from "@huggingface/inference";

import getSecretKeys from "../../../envVariables/envVariables.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";

import splitTextIntoThreeParts from "./utils/splitTextsIntoThreeEqualParts.js";
import processClientNameGotten from "./utils/processClientNameGotten.js";
import getTotalWordsLength from "./utils/getTotalWordsLength.js";

const keysObject = getSecretKeys();
const model = keysObject.huggingFaceModel;
const HF_TOKEN = keysObject.HF_TOKEN;
const hf = new HfInference(HF_TOKEN);

const getClientNamePromptHeading = `The texts below are freelancers feedback to their clients. 

   Read through patiently searching for all the human names or company like name, or if it appears that the client is a team of people.
   
   If you see a company like name, return "They are company" 

   If you see a team like name, return "They are team"

   if there are multiple names, seperate them using comma.

   If there are no human names in the text below, return "Hello!".

   Never count "Sir" as part of a name

   don't prefix your response with things like "Here is the output:" and don't close with any message.

   Only return any of "They are company" , "They are team",  "Hello!", or the client names or name.


   Freelancers feedback to their clients Texts : 

   
`;

const getClientNameRouter = express.Router();

getClientNameRouter.post("/", async (req, res) => {
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

  const { prompt } = bodyRequest;

  // console.log(" prompt", prompt);

  try {
    const clientNameResponse = await getResponseFromAi(prompt);

    //return final shit still
    return res.json({ clientNameResponse });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

async function getResponseFromAi(prompt) {
  let fullResponse = ""; // Initialize an empty string to store the full response

  for await (const chunk of hf.chatCompletionStream({
    model: "meta-llama/Meta-Llama-3-8B-Instruct",
    messages: [
      {
        role: "user",
        content: `${getClientNamePromptHeading}
        
${prompt} 
`,
      },
    ],
    max_tokens: 500,
  })) {
    const response = chunk.choices[0]?.delta?.content;
    if (response) {
      fullResponse += response; // Concatenate each chunk to the full response
    }
  }

  console.log("Final response:", fullResponse); // Log the full response
  return fullResponse; // Return the full response
}

export default getClientNameRouter;
