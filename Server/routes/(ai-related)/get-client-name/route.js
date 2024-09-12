import express from "express";
import { HfInference } from "@huggingface/inference";

import getSecretKeys from "../../../envVariables/envVariables.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";

const keysObject = getSecretKeys();
const model = keysObject.huggingFaceModel;
const HF_TOKEN = keysObject.HF_TOKEN;
const hf = new HfInference(HF_TOKEN);

const theyAreCompanyText = "Hi there";
const theyAreATeamText = "Hi";
const helloText = "Hello!";

const getClientNamePromptHeading = `The texts below are freelancers feedback to their clients. 

   Read through patiently searching for human names.
  

   if there are multiple names, seperate them using comma.

   If there are no human names in the text below, return ${helloText}.

   Never count "Sir" as part of a name

   don't prefix your response with things like "Here is the output:" or "Here are the responses based on the instructions:" or "Here are the client names or company like names" or anything that looks like that and don't close with any message.

   Only return any of  ${helloText}, or the client names or name.

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

    const doesItHasMoreThan3Words = hasMoreThanThreeWords(clientNameResponse);

    console.log("doesItHasMoreThan3Words", doesItHasMoreThan3Words);
    console.log("clientNameResponse", clientNameResponse);

    if (doesItHasMoreThan3Words == false)
      return res.json({ clientNameResponse });

    console.log("has more than 3 words");

    const isThereACommonName = findCommonName(clientNameResponse);

    if (isThereACommonName) {
      console.log("isThereACommonName", isThereACommonName);
      return res.json({ clientNameResponse: isThereACommonName });
    }

    console.log("clientNameResponse", clientNameResponse);

    // editNameWithAiToMakeItMorePerfect(promptInstruction, prompt)

    //return final shit still
    return res.json({ clientNameResponse });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});
async function getResponseFromAi(prompt) {
  try {
    const response = await hf.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        {
          role: "user",
          content: `${getClientNamePromptHeading}
        
${prompt}`,
        },
      ],
      max_tokens: 500,
    });

    const fullResponse = response.choices[0]?.message?.content;

    console.log("fullResponse", fullResponse);

    if (fullResponse.includes(theyAreCompanyText)) {
      return theyAreCompanyText;
    } else if (fullResponse.includes(theyAreATeamText)) {
      return theyAreATeamText;
    } else if (fullResponse.includes(helloText)) {
      return helloText;
    }

    return fullResponse; // Return the full response at once
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error; // Handle errors appropriately
  }
}

// async function editNameWithAiToMakeItMorePerfect(promptInstruction, prompt) {
//   let fullResponse = ""; // Initialize an empty string to store the full response

//   for await (const chunk of hf.chatCompletionStream({
//     model: "meta-llama/Meta-Llama-3-8B-Instruct",
//     messages: [
//       {
//         role: "user",
//         content: `${promptInstruction}

// ${prompt}
// `,
//       },
//     ],
//     max_tokens: 500,
//   })) {
//     const response = chunk.choices[0]?.delta?.content;
//     if (response) {
//       fullResponse += response; // Concatenate each chunk to the full response
//     }
//   }

//   return fullResponse; // Return the full response
// }

function hasMoreThanThreeWords(text) {
  // Split the text into words based on spaces and filter out any empty strings
  const words = text.trim().split(/\s+/); // \s+ matches one or more spaces
  return words.length > 3;
}

function findCommonName(names) {
  // Split each name into words, removing commas first
  let common = names[0].replace(/,/g, "").split(" ");

  for (let i = 1; i < names.length; i++) {
    let currentWords = names[i].replace(/,/g, "").split(" ");
    common = common.filter((word) => currentWords.includes(word));
  }

  return common.length > 0 ? common.join(" ") : false;
}

export default getClientNameRouter;
