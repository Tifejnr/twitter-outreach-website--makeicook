import express from "express";
import { HfInference } from "@huggingface/inference";

import getSecretKeys from "../../../envVariables/envVariables.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import forbiddenNamesInclusionArray from "./forbiddenNamesInclusion.js";

const keysObject = getSecretKeys();
const model = keysObject.huggingFaceModel;
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

const doesTheNameSoundLikeitsOneClient = `
Return "Yes" or "No" only for this.

Ignoring minor spelling mistakes.

Are these super distinct names?
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

    const clientNameResponse = await editNameWithAiToMakeItMorePerfect(
      editFirstNamePromptInstruction,
      clientNameResponseRaw
    );

    const isItCompanyNameResponse = await editNameWithAiToMakeItMorePerfect(
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

    console.log("clientNameResponse", clientNameResponse);

    const finalName = findCommonName(clientNameResponse);

    const isItSingleClientName = await editNameWithAiToMakeItMorePerfect(
      doesTheNameSoundLikeitsOneClient,
      finalName
    );

    console.log("isItSingleClientName", isItSingleClientName);

    if (isItSingleClientName == "No") {
      console.log("isItSingleClientName", isItSingleClientName);
      return res.json({
        clientNameResponse:
          finalName == realNoNamesFoundResponse
            ? realNoNamesFoundResponse
            : "Multiple names, Team",
      });
    }

    console.log("finalName", finalName);

    //return final shit still
    return res.json({ clientNameResponse: finalName });
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

async function editNameWithAiToMakeItMorePerfect(promptInstruction, prompt) {
  try {
    const response = await hf.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        {
          role: "user",
          content: `${promptInstruction}
      
${prompt}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.1,
    });

    const fullResponse = response.choices[0]?.message?.content;

    return fullResponse; // Return the full response
  } catch (error) {
    return "error occured";
  }
}

function hasMoreThanThreeWords(text) {
  // Split the text into words based on spaces and filter out any empty strings
  const words = text.trim().split(/\s+/); // \s+ matches one or more spaces
  return words.length > 3;
}
function findCommonName(names) {
  const namesWithHypghenRemoved = names.replace(/-/g, "");

  const passedArray = [];

  const namesArray = namesWithHypghenRemoved.split(", ");

  // Find the shortest name in the array and remove both commas and hyphens
  let shortest = namesArray.reduce((a, b) => (a.length <= b.length ? a : b));

  const namesArrayLength = namesArray.length;

  for (let i = 0; i < namesArray.length; i++) {
    const currentName = namesArray[i];

    if (currentName.includes(shortest)) {
      passedArray.push(1);
    }
  }

  if (passedArray.length == namesArrayLength) {
    return shortest;
  }
  return names;
}

export default getClientNameRouter;
