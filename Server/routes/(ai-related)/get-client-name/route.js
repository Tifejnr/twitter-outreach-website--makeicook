import express from "express";

import getSecretKeys from "../../../envVariables/envVariables.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
// import forbiddenNamesInclusionArray from "./forbiddenNamesInclusion.js";
import clientPersonalityPromptsObj from "./clientPersonalityPromptsObj.js";
// import getStraightAiResponse from "./get-ai-response/getStraightAiResponse.js";

const keysObject = getSecretKeys();
// const model = keysObject.aiModel;
// const HF_TOKEN = keysObject.HF_TOKEN;
// const hf = new HfInference(HF_TOKEN);

import { HfInference } from "@huggingface/inference";

// import getSecretKeys from "../../../../envVariables/envVariables";

// const keysObject = getSecretKeys();
const model = keysObject.aiModel;
const HF_TOKEN = keysObject.HF_TOKEN;
const hf = new HfInference(HF_TOKEN);

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

const confirmNamePrompt = `Return "Yes" or "No".

Check all names 

Is any of the names below a human name ?

`;

const realNoNamesFoundResponse = "No names found";
const theyAreCompanyText = "Hi there";
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

const prefixToRemove =
  "Here is a summary of how freelancers described working with the client:";

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

  const ignoredText = "ignored";

  const rawPrompt = bodyRequest.prompt;

  const prompt = rawPrompt.replace(ignoredText, "...");

  // console.log(" prompt", prompt);

  try {
    //get client personality
    const clientPersonalityRaw = await getStraightAiResponse(
      clientPersonalityPromptsObj.promptToActForClientSummary,
      prompt,
      0.7
    );

    const clientPersonality = clientPersonalityRaw.replace(prefixToRemove, "");

    //get client name
    const clientNameResponseRaw = await getStraightAiResponse(
      getClientNamePromptHeading,
      prompt,
      0.1
    );

    const clientNameResponse = await getStraightAiResponse(
      editFirstNamePromptInstruction,
      clientNameResponseRaw
    );

    const isItCompanyNameResponse = await getStraightAiResponse(
      doesTheNameSoundLikeCompany,
      clientNameResponse
    );

    if (isItCompanyNameResponse == "Yes" && !finalName.includes(",")) {
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

        clientPersonality,
        multipleNames: clientNameResponse,
      });
    }

    const finalName = findCommonName(clientNameResponse);

    console.log("returned name", finalName);

    if (finalName.includes(",")) {
      const promptToCheckForSingleNames = `
      return "Yes" or "No" only.
      
      Do these names share 90% almost the same set of letters?
      `;

      const isItASingleName = await getStraightAiResponse(
        promptToCheckForSingleNames,
        finalName
      );

      //for multiple names found

      if (isItASingleName == "No") {
        const promptToCheckIfItsSurnameAndFirstname = `
      Names : ${finalName}

      return "Yes" or "No" and why.
      
      Are these names joined by "and" anywhere in the texts below: 
  
        `;
        const isItMultipleNameResponse = await getStraightAiResponse(
          promptToCheckIfItsSurnameAndFirstname,
          prompt
        );

        console.log("isItMultipleNameResponse", isItMultipleNameResponse);

        //its firstname and last name seperated by comma
        if (isItMultipleNameResponse == "No") {
          const nameToFreelancer = finalName.replace(",", "");

          console.log(
            "nameToFreelancer",
            nameToFreelancer,
            "isItMultipleNameResponse",
            isItMultipleNameResponse
          );

          res.json({
            clientNameResponse: nameToFreelancer,
            clientPersonality,
          });

          return;
        }

        const nameToFreelancer = "Multiple names";
        // isNameAHumanName == "No"
        //   ? realNoNamesFoundResponse
        console.log(
          "nameToFreelancer",
          nameToFreelancer,
          "Multiple names found",
          finalName
        );

        return res.json({
          clientNameResponse: nameToFreelancer,
          multipleNames: finalName,
          clientPersonality,
        });
      }
    }

    const isNameAHumanName = await getStraightAiResponse(
      confirmNamePrompt,
      finalName
    );

    const nameToFreelancer =
      isNameAHumanName == "No" && !finalName.includes(",")
        ? realNoNamesFoundResponse
        : finalName;

    console.log(
      "nameToFreelancer",
      nameToFreelancer,
      "isNameAHumanName",
      isNameAHumanName
    );

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

export default getClientNameRouter;
