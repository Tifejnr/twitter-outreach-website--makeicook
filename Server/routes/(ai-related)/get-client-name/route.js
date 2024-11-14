import express from "express";

import getSecretKeys from "../../../envVariables/envVariables.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
// import forbiddenNamesInclusionArray from "./forbiddenNamesInclusion.js";
import clientPersonalityPromptsObj from "./clientPersonalityPromptsObj.js";
// import getStraightAiResponse from "./get-ai-response/getStraightAiResponse.js";

const keysObject = getSecretKeys();

import { HfInference } from "@huggingface/inference";
import countStringOccurrences from "./utils/is-client-a-team/countStringOccurences.js";
import checkIfNameAndTeamVariationAppearAtEqualTime from "./utils/is-client-a-team/checkIfNameAndTeamVariationAppearAtEqualTime.js";
import getTotalWordsLength from "./utils/getTotalWordsLength.js";
import forbiddenNamesInclusionArray from "./forbiddenNamesInclusion.js";
import areAllNamesForbidden from "./utils/are-all-names-forbidden/areAllNamesForbidden.js";
import findCommonName from "./utils/find-common-name/findCommonName.js";
import areAllNamesHumanNames from "./utils/are-all-names-forbidden/areAllNamesHumanNames.js";
import orderOfMultipleNames from "./utils/order-of-multiple-names/orderOfMultipleNames.js";
import getOccurenceNoAndFirstXtersNo from "./utils/order-of-multiple-names/getOccurenceNoAndFirstXtersNo.js";

const model = keysObject.aiModel;
const HF_TOKEN = keysObject.HF_TOKEN;
const hf = new HfInference(HF_TOKEN);

export async function getStraightAiResponse(
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

export const confirmNamePrompt = `Return "Yes" or "No" only.

Check all names 

Pronouns "he" , "She", "him", "her", "his" are not human names.

return "No" if name is "Client".

Is any of the names below a human name ?

`;

export const realNoNamesFoundResponse = "No names found";
const theyAreCompanyText = "Hi there";
const helloText = realNoNamesFoundResponse;
const noNamesFoundText = "(no names found)";
const clientIsATeamText = "Likely a team";

const getClientNamePromptHeading = `The texts below are freelancers feedback to their clients. 

  Read through patiently searching for human names.

  Never repeat the same name. 

  Never autogenerate a name.

  Don't count praisy phrases like " Great person" "Great client" as human name.

  These words : "he" , "She", "him" , "her", "his" are not a human name.

  Don't count any phrase including personal pronouns " he" , "She", "him" , "her", "his" as human name.

  Pronouns "he" , "She", "him" , "her", "his" are not human names.
  
  if there are multiple names, seperate them using comma.

   Never repeat the same name.

   If there are no human names in the text below, return ${helloText}.

   Never count "Sir" as part of a name

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

  Never auto generate names.

  Don't count praisy phrases like " Great person" "Great client", "wonderful client" as human name.

  Don't count personal pronouns "he" , "She", "him" , "her", "his" as human name.

  Don't count any phrase including personal pronouns " he" , "She", "him" , "her", "his" as human name.

  Don't prefix your response with "After carefully reading the text, I found one unique human name:"

  ONLY Return the names, no additional text or commentary or explanation.
`;

// const doesTheNameSoundLikeCompanyPrompt = `

// Return "Yes" or "No" only for this.

// Note, human names are not company names in this context.

// do any of the words below sound like a company name ?

// If the name sound more human than company, return "No".

// `;

const creditsIsZeroText = "Buy credits";
const errorOcuured = "error occured";

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

  const promptRaw = bodyRequest.prompt;
  const { credits } = resultOfTokenValidation;

  const timelyText = "Timely";

  const prompt = promptRaw.replace(timelyText, "");

  console.log("credits", credits);

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
      0
    );

    if (clientNameResponseRaw.includes(errorOcuured)) {
      return res.json({
        clientNameResponse: errorOcuured,
        clientPersonality: errorOcuured,
      });
    }

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

    let finalName = findCommonName(clientNameResponse);

    const isForbiddenNameIncludedIn = forbiddenNamesInclusionArray.find(
      (forbiddenName) => {
        const escapedForbiddenName = forbiddenName
          .toLowerCase()
          .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`\\b${escapedForbiddenName}\\b`);
        return regex.test(finalName.toLowerCase());
      }
    );

    if (finalName == "clint" || isForbiddenNameIncludedIn) {
      //if it's single name
      if (!finalName.includes(",")) {
        console.log("name includes forbidden keywords:", finalName);

        if (credits === 0) {
          return res.json({
            clientNameResponse: creditsIsZeroText,
            clientPersonality: creditsIsZeroText,
          });
        }

        return res.json({
          clientNameResponse: realNoNamesFoundResponse,
          clientPersonality,
        });
      }
      if (finalName.includes(",")) {
        const incommingFinalName = finalName;
        finalName = areAllNamesForbidden(incommingFinalName);

        console.log("checked forbiddent final name result", finalName);
      }
    }

    console.log("final name", finalName);

    //check if returned name is within freelancers feedback

    if (!finalName.includes(",")) {
      const occurenceObj = getOccurenceNoAndFirstXtersNo(prompt, finalName);

      const { occurrences } = occurenceObj;

      if (occurrences === 0) {
        console.log("occurences is 0", finalName);
        finalName = realNoNamesFoundResponse;
      }
    }

    const doesTheNameSoundLikeCompanyPrompt = `Return "Yes" or "No" only for this.
    
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

        //check if credits is zero
        if (credits === 0) {
          return res.json({
            clientNameResponse: creditsIsZeroText,
            clientPersonality: creditsIsZeroText,
          });
        }

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

      //check if credits is zero
      if (credits === 0) {
        return res.json({
          clientNameResponse: creditsIsZeroText,
          clientPersonality: creditsIsZeroText,
        });
      }

      return res.json({
        clientNameResponse:
          clientNameResponse == realNoNamesFoundResponse
            ? realNoNamesFoundResponse
            : "Likely a team",

        clientPersonality,
        multipleNames: `${finalName} team`,
      });
    }

    // const doesTeamNameAppearMoreThanOnce = getOccurenceNoAndFirstXtersNo(
    //   prompt,
    //   "team"
    // );

    // if (doesTeamNameAppearMoreThanOnce) {
    //   console.log(" isItATeamNameResponse", isItATeamNameResponse, finalName);
    //   return res.json({
    //     clientNameResponse: "They're a team",
    //     clientPersonality,
    //   });
    // }

    if (finalName.includes(",")) {
      const isItReallySingleNameResponse = checkNameInText(finalName, prompt);

      console.log("isItReallySingleNameResponse", isItReallySingleNameResponse);

      //its firstname and last name seperated by comma
      if (isItReallySingleNameResponse) {
        const nameToFreelancer = finalName.replace(",", "");

        console.log(
          "nameToFreelancer",
          nameToFreelancer,
          "isItReallySingleNameResponse",
          isItReallySingleNameResponse
        );

        //check if credits is zero
        if (credits === 0) {
          return res.json({
            clientNameResponse: creditsIsZeroText,
            clientPersonality: creditsIsZeroText,
          });
        }

        res.json({
          clientNameResponse: nameToFreelancer,
          clientPersonality,
        });

        return;
      }

      //check if each of the names are human names.
      const returnedHumanNames = await orderOfMultipleNames(finalName, prompt);

      if (returnedHumanNames == realNoNamesFoundResponse) {
        console.log("none of  comma seperated name is human", finalName);

        //check if credits is zero
        if (credits === 0) {
          return res.json({
            clientNameResponse: creditsIsZeroText,
            clientPersonality: creditsIsZeroText,
          });
        }

        return res.json({
          clientNameResponse: returnedHumanNames,
          clientPersonality,
        });
      }

      //only one name is human name
      if (!returnedHumanNames.includes(",")) {
        console.log(
          "none of  comma seperated name is human,nly one name is human name",
          finalName
        );

        //check if credits is zero
        if (credits === 0) {
          return res.json({
            clientNameResponse: creditsIsZeroText,
            clientPersonality: creditsIsZeroText,
          });
        }

        return res.json({
          clientNameResponse: returnedHumanNames,
          clientPersonality,
        });
      }

      const nameToFreelancer = "Names";

      console.log(
        "nameToFreelancer with comma for sure",
        nameToFreelancer,
        "Multiple names found",
        returnedHumanNames
      );

      //check if credits is zero
      if (credits === 0) {
        return res.json({
          clientNameResponse: creditsIsZeroText,
          clientPersonality: creditsIsZeroText,
        });
      }

      return res.json({
        clientNameResponse: nameToFreelancer,
        multipleNames: returnedHumanNames,
        clientPersonality,
      });
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
    //check if credits is zero
    if (credits === 0) {
      return res.json({
        clientNameResponse: creditsIsZeroText,
        clientPersonality: creditsIsZeroText,
      });
    }

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
