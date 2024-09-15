import express from "express";
import { HfInference } from "@huggingface/inference";

import getSecretKeys from "../../../envVariables/envVariables.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import forbiddenNamesInclusionArray from "./forbiddenNamesInclusion.js";
import clientPersonalityPromptsObj from "./clientPersonalityPromptsObj.js";

const keysObject = getSecretKeys();
const model = keysObject.aiModel;
const HF_TOKEN = keysObject.HF_TOKEN;
const hf = new HfInference(HF_TOKEN);

const realNoNamesFoundResponse = "No names found";
const theyAreCompanyText = "Hi there";
const theyAreATeamText = "Hi";
const helloText = realNoNamesFoundResponse;
const noNamesFoundText = "(no names found)";

const getClientNamePromptHeading = `The texts below are freelancers feedback to their clients. 

  Read through patiently searching for human names.

  Never repeat the same name. 

  Never autogenerate anything.

  Don't count praisy phrases like " Great person" "Great client" as human name.

  These words : "he" , "She", "him" , "her", "his" are not a human name.

  Don't count any phrase including personal pronouns " he" , "She", "him" , "her", "his" as human name.

  Pronouns "he" , "She", "him" , "her", "his" are not human names.
  
  if there are multiple names, seperate them using comma.

   Never repeat the same name.

   If there are no human names in the text below, return ${helloText}.

   Never count "Sir" as part of a name

   Don't prefix your response with things like "Here is the output:" or "Here are the responses based on the instructions:" or "Here are the client names or company like names" or 
   
   "Here is the list of human names mentioned in the feedback" or anything that looks like that and don't close with any message.

   Only return any of  ${helloText}, or the client names or name.
   
   Praisy phrases like " Great person" "Great client" etc is not human name.

   Note: Never repeat the same name.

   Freelancers feedback to their clients Texts : 

   
`;

const editFirstNamePromptInstruction = `
  Read through the text below patiently searching for human names, Don't count company-like names as human name here.

  Extract only the unique human name(s) from the text below, and return them in a comma-separated format.

  count two letter nicknames as unique human name only if they are in the text, never autogenerate anything.

  Enusre no name is repeated twice in your response.

  Don't count praisy phrases like " Great person" "Great client", "wonderful client" as human name.

  Don't count personal pronouns "he" , "She", "him" , "her", "his" as human name.

  Don't count any phrase including personal pronouns " he" , "She", "him" , "her", "his" as human name.

  if there are multiple names, seperate them using comma.

  Never repeat the same name.

  Extract only the unique human name(s) from the text below, and return only the names(s) in a comma-separated format.

  Don't prefix your response with "After carefully reading the text, I found one unique human name:"

  ONLY Return the names, no additional text or commentary or explanation.
`;

const doesTheNameSoundLikeCompany = `

Return "Yes" or "No" only for this.

Note, human names are not company names in this context.

do any of the words below sound like a company name ?

If the name sound more human than company, return "No".

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
    const clientNameResponseRaw = await getResponseFromAi(prompt);

    const clientNameResponse = await getStraightAiResponse(
      editFirstNamePromptInstruction,
      clientNameResponseRaw
    );

    const isItCompanyNameResponse = await getStraightAiResponse(
      doesTheNameSoundLikeCompany,
      clientNameResponse
    );

    if (isItCompanyNameResponse == "Yes") {
      console.log(
        " isItCompanyNameResponse",
        isItCompanyNameResponse,
        clientNameResponse
      );
      return res.json({
        clientNameResponse:
          clientNameResponse == realNoNamesFoundResponse
            ? realNoNamesFoundResponse
            : "They're a Company",
      });
    }

    const finalName = findCommonName(clientNameResponse);

    console.log("returned name", finalName);

    if (finalName.includes(",")) {
      const promptToCheckForSingleNames = `
      return "Yes" or "No" only.
      
      Do these names share almost the same set of letters?
      `;

      // console.log("response", response);
      const isItASingleName = await getStraightAiResponse(
        promptToCheckForSingleNames,
        finalName
      );

      if (isItASingleName == "No") {
        console.log("Multiple names found", finalName);

        //get client personality
        const clientPersonalityRaw = await getStraightAiResponse(
          clientPersonalityPromptsObj.promptToActForClientSummary,
          prompt
        );

        const prefixToRemove =
          "Here is a summary of how freelancers described working with the client:";

        const clientPersonality = clientPersonalityRaw.replace(
          prefixToRemove,
          ""
        );

        const isForbiddenNameIncludedIn = forbiddenNamesInclusionArray.find(
          (forbiddenName) => {
            const escapedForbiddenName = forbiddenName
              .toLowerCase()
              .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regex = new RegExp(`\\b${escapedForbiddenName}\\b`);
            return regex.test(finalName.toLowerCase());
          }
        );

        const nameToFreelancer = isForbiddenNameIncludedIn
          ? realNoNamesFoundResponse
          : "Multiple names";

        console.log("nameToFreelancer", nameToFreelancer);

        return res.json({
          clientNameResponse: nameToFreelancer,
          multipleNames: isForbiddenNameIncludedIn ? "" : finalName,
          clientPersonality,
        });
      }
    }

    const isForbiddenNameIncludedIn = forbiddenNamesInclusionArray.find(
      (forbiddenName) => {
        const escapedForbiddenName = forbiddenName
          .toLowerCase()
          .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`\\b${escapedForbiddenName}\\b`);
        return regex.test(finalName.toLowerCase());
      }
    );

    const nameToFreelancer = isForbiddenNameIncludedIn
      ? realNoNamesFoundResponse
      : finalName;

    console.log("nameToFreelancer", nameToFreelancer);

    //get client personality
    const clientPersonalityRaw = await getStraightAiResponse(
      clientPersonalityPromptsObj.promptToActForClientSummary,
      prompt
    );

    const prefixToRemove =
      "Here is a summary of how freelancers described working with the client:";

    const clientPersonality = clientPersonalityRaw.replace(prefixToRemove, "");

    //return final shit still
    return res.json({
      clientNameResponse: nameToFreelancer,
      clientPersonality,
    });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});
async function getResponseFromAi(prompt) {
  try {
    const response = await hf.chatCompletion({
      model,
      messages: [
        {
          role: "user",
          content: `${getClientNamePromptHeading}
        
${prompt}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.1,
    });

    const fullResponse = response.choices[0]?.message?.content;

    if (fullResponse.includes(theyAreCompanyText)) {
      return theyAreCompanyText;
    }
    if (fullResponse.includes(theyAreATeamText)) {
      return theyAreATeamText;
    }
    if (fullResponse.includes(helloText)) {
      return helloText;
    }
    if (fullResponse == noNamesFoundText) {
      console.log("noNamesFoundText", noNamesFoundText);
      return realNoNamesFoundResponse;
    }

    return fullResponse; // Return the full response at once
  } catch (error) {
    console.error("Error fetching AI response:", error);

    return "error occured";
    throw error; // Handle errors appropriately
  }
}

async function getStraightAiResponse(
  promptInstruction,
  prompt,
  customTemperature
) {
  try {
    const response = await hf.chatCompletion({
      model,
      messages: [
        {
          role: "user",
          content: `${promptInstruction}
      
${prompt}`,
        },
      ],
      max_tokens: 500,
      temperature: customTemperature ? customTemperature : 0.1,
    });

    const fullResponse = response.choices[0]?.message?.content;

    return fullResponse; // Return the full response
  } catch (error) {
    return "error occured";
  }
}

// function hasMoreThanThreeWords(text) {
//   // Split the text into words based on spaces and filter out any empty strings
//   const words = text.trim().split(/\s+/); // \s+ matches one or more spaces
//   return words.length > 3;
// }
function findCommonName(names) {
  const namesWithHypghenRemoved = names.replace(/-/g, "");

  const passedArray = [];

  const namesArray = namesWithHypghenRemoved.split(", ");

  // Find the shortest name in the array and remove both commas and hyphens
  let shortest = namesArray.reduce((a, b) => (a.length <= b.length ? a : b));
  let longestName = namesArray.reduce((a, b) => (a.length >= b.length ? a : b));

  const namesArrayLength = namesArray.length;

  for (let i = 0; i < namesArray.length; i++) {
    const currentName = namesArray[i].toLowerCase();

    if (currentName.includes(shortest.toLowerCase())) {
      passedArray.push(1);
    }
  }

  if (passedArray.length == namesArrayLength) {
    return longestName;
  }
  return names;
}

// function isItASingleNameAllThrough(names) {
//   const namesWithHyphenRemoved = names.replace(/-/g, "");
//   const namesArray = namesWithHyphenRemoved.split(", ");

//   // Find the shortest name in the array
//   let shortest = namesArray
//     .reduce((a, b) => (a.length <= b.length ? a : b))
//     .toLowerCase();

//   const passedArray = [];

//   // Loop through each name except the shortest
//   for (let i = 0; i < namesArray.length; i++) {
//     let currentName = namesArray[i].toLowerCase();

//     // For every letter in the shortest name
//     for (let char of shortest) {
//       // Check if the letter is present in the current name
//       if (currentName.includes(char)) {
//         passedArray.push(1); // Push 1 for each match
//       }
//     }
//   }

//   // Check if the length of the shortest name is equal to the final pushed array length
//   const lengthToGiveSpaceForTwoErrorInAlphabets =
//     shortest.length * namesArray.length - (1 * namesArray.length - 1);

//   if (
//     passedArray.length - shortest.length >=
//     lengthToGiveSpaceForTwoErrorInAlphabets
//   ) {
//     return true;
//   }

//   return false;
// }

export default getClientNameRouter;
