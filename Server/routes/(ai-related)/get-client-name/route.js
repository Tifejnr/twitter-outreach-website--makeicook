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
import countStringOccurrences from "./utils/is-client-a-team/countStringOccurences.js";
import checkIfNameAndTeamVariationAppearAtEqualTime from "./utils/is-client-a-team/checkIfNameAndTeamVariationAppearAtEqualTime.js";
import getTotalWordsLength from "./utils/getTotalWordsLength.js";

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

const confirmNamePrompt = `Return "Yes" or "No" only.

Check all names 

Pronouns "he" , "She", "him", "her", "his" are not human names.

return "No" if name is "Client".

Is any of the names below a human name ?

`;

const realNoNamesFoundResponse = "No names found";
const theyAreCompanyText = "Hi there";
const helloText = realNoNamesFoundResponse;
const noNamesFoundText = "(no names found)";
const clientIsATeamText = "Likely a team";

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

   Never count "Client" as a name

   Don't edit the name in anyway in your result.

   Don't prefix your response with things like "Here is the output:" or "Here are the responses based on the instructions:" or "Here are the client names or company like names" or 
   
   "Here is the list of human names mentioned in the feedback" or anything that looks like that and don't close with any message.

   Only return any of  ${helloText}, or the client names or name.
   
   Praisy phrases like " Great person" "Great client" etc is not human name.

   Note: Never autogenerate a random name not found in the text.

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

  Don't prefix your response with "After carefully reading the text, I found one unique human name:"

  ONLY Return the names, no additional text or commentary or explanation.
`;

// const doesTheNameSoundLikeCompanyPrompt = `

// Return "Yes" or "No" only for this.

// Note, human names are not company names in this context.

// do any of the words below sound like a company name ?

// If the name sound more human than company, return "No".

// `;

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

  try {
    //get client personality
    const clientPersonalityRaw = await getStraightAiResponse(
      clientPersonalityPromptsObj.promptToActForClientSummary,
      prompt,
      0.9
    );

    const clientPersonality = clientPersonalityRaw.replace(prefixToRemove, "");

    //get client name
    const clientNameResponseRaw = await getStraightAiResponse(
      getClientNamePromptHeading,
      prompt,
      0.1
    );

    const totalWordsLength = getTotalWordsLength(clientNameResponseRaw);

    let clientNameResponse;

    if (totalWordsLength > 9) {
      clientNameResponse = await getStraightAiResponse(
        editFirstNamePromptInstruction,
        clientNameResponseRaw
      );
    } else {
      clientNameResponse = clientNameResponseRaw;
    }

    const finalName = findCommonName(clientNameResponse);

    if (finalName == "clint") {
      console.log("wrong spelling of client likely");

      return res.json({
        clientNameResponse: realNoNamesFoundResponse,
        clientPersonality,
      });
    }

    console.log("returned name", finalName);

    //check if returned name is within freelancers feedback

    const isNameWithinTextRangePrompt = `
    return "Yes" or "No" only.

    is  ${finalName} present in the text below :
`;

    const isFinalNamePresentInFeedback = await getStraightAiResponse(
      isNameWithinTextRangePrompt,
      prompt
    );

    if (isFinalNamePresentInFeedback == "No" && !finalName.includes(",")) {
      return res.json({
        clientNameResponse: realNoNamesFoundResponse,
        clientPersonality,
      });
    }
    if (isFinalNamePresentInFeedback == "No" && finalName.includes(",")) {
      console.log(
        "isFinalNamePresentInFeedback is no when multiple names",
        isFinalNamePresentInFeedback
      );
      return res.json({
        clientNameResponse: realNoNamesFoundResponse,
        clientPersonality,
      });
    }

    const doesTheNameSoundLikeCompanyPrompt = `

    Return "Yes" or "No" only for this.
    
    Note, human names are not company names in this context.
    
    do any of the words below sound like a company name ?
    
    If the name sound more human than company, return "No".
    
    `;

    const isItCompanyNameResponse = await getStraightAiResponse(
      doesTheNameSoundLikeCompanyPrompt,
      finalName
    );

    if (isItCompanyNameResponse == "Yes" && !finalName.includes(",")) {
      const finalCheckIfHumanNamePrompt = `
ignoring USA and UK Names, is the probability of Navacara appearing as a human name in countries all over the world more than 0.0001? 

return "Yes" or "No" only as response.

      `;
      const finalCheckIfHumanNameResponse = await getStraightAiResponse(
        finalCheckIfHumanNamePrompt,
        finalName
      );

      if (finalCheckIfHumanNameResponse == "No") {
        console.log(
          " isItCompanyNameResponse",
          isItCompanyNameResponse,
          finalName
        );
        return res.json({
          clientNameResponse:
            clientNameResponse == realNoNamesFoundResponse
              ? realNoNamesFoundResponse
              : "Likely a Company",

          clientPersonality,
          multipleNames: clientNameResponse,
        });
      }
    }

    const noOfTimePureNameWasFound = countStringOccurrences(finalName, prompt);

    const noOfTimeTeamNameWasFound = countStringOccurrences(
      `${finalName} team`,
      prompt
    );

    const isItATeamNameResponse = checkIfNameAndTeamVariationAppearAtEqualTime(
      noOfTimePureNameWasFound,
      noOfTimeTeamNameWasFound
    );

    if (isItATeamNameResponse) {
      console.log(" isItATeamNameResponse", isItATeamNameResponse, finalName);
      return res.json({
        clientNameResponse:
          clientNameResponse == realNoNamesFoundResponse
            ? realNoNamesFoundResponse
            : "Likely a team",

        clientPersonality,
        multipleNames: `${finalName} team`,
      });
    }

    if (finalName.includes(",")) {
      const promptToCheckForSingleNames = `
      return "Yes" or "No" only.
      
      Do these names share 90% almost the same set of letters?
      `;

      const isItASingleName = await getStraightAiResponse(
        promptToCheckForSingleNames,
        finalName
      );

      console.log("isItASingleName", isItASingleName);

      //for multiple names found

      if (isItASingleName == "No") {
        const isItReallySingleNameResponse = checkNameInText(finalName, prompt);

        console.log(
          "isItReallySingleNameResponse",
          isItReallySingleNameResponse
        );

        //its firstname and last name seperated by comma
        if (isItReallySingleNameResponse) {
          const nameToFreelancer = finalName.replace(",", "");

          console.log(
            "nameToFreelancer",
            nameToFreelancer,
            "isItReallySingleNameResponse",
            isItReallySingleNameResponse
          );

          res.json({
            clientNameResponse: nameToFreelancer,
            clientPersonality,
          });

          return;
        }

        const isNameAHumanName = await getStraightAiResponse(
          confirmNamePrompt,
          finalName
        );

        const nameToFreelancer =
          isNameAHumanName == "No"
            ? realNoNamesFoundResponse
            : "Multiple names";

        // const nameToFreelancer = "Multiple names";
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
          multipleNames: isNameAHumanName == "No" ? "" : finalName,
          clientPersonality,
        });
      }
    }

    let isNameAHumanName;

    if (finalName.includes(realNoNamesFoundResponse)) {
      isNameAHumanName = "No";
    } else {
      isNameAHumanName = await getStraightAiResponse(
        confirmNamePrompt,
        finalName
      );

      //cfinal confirmation if it's  ahuman name or not.
      if (isNameAHumanName == "No") {
        const isNameFoundInAnyCountryPrompt = `
      Return "Yes" or "No" only. 
      
      If name is a pronoun, return "No"
      
      If name is a common term used to refer to a person, return "No"
      
      Is the name is found as a given name in any country in the world? return "Yes" 
      
      `;

        const nameAndContext = `name : ${finalName}
     
     Context : ${prompt}
     `;

        isNameAHumanName = await getStraightAiResponse(
          isNameFoundInAnyCountryPrompt,
          nameAndContext,
          0.1
        );
      }
    }

    const nameToFreelancer =
      isNameAHumanName == "No" ? realNoNamesFoundResponse : finalName;

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

function checkNameInText(name, incomingText) {
  // Step 1: Ensure the name is only separated by a comma (with optional spaces around it)
  const commaSeparatedPattern = /^\s*[^,]+,\s*[^,]+\s*$/;

  if (!commaSeparatedPattern.test(name)) {
    return false; // Return false if the name is not correctly separated by a comma
  }

  // Step 2: Remove the comma and trim the name
  const cleanedName = name.replace(",", "").trim();

  // Step 3: Trim the incoming text
  const trimmedText = incomingText.trim();

  // Step 4: Check if the trimmed text includes the cleaned name
  return trimmedText.includes(cleanedName);
}

export default getClientNameRouter;

// https://www.upwork.com/jobs/~021839341791060043020  Can was chosen as name, use probabi;ity to filter it as a name
