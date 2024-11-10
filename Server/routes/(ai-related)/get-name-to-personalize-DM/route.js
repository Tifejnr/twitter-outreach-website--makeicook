import express from "express";
import { HfInference } from "@huggingface/inference";

import getSecretKeys from "../../../envVariables/envVariables.js";
import confirmAllAreRealNames from "./confirmAllAreRealNames.js";
import isNameAMixtureOfTwoNames from "./isNameAMixtureOfTwoNames.js";

const keysObject = getSecretKeys();
const model = keysObject.aiModel;
const HF_TOKEN = keysObject.HF_TOKEN;
const hf = new HfInference(HF_TOKEN);

const getNameRouterToPersonalizeDmRouter = express.Router();

const gettingNameToUseBtwUsernameAndDisplayNamePrompt = `You must return one of the names.

Ignoring symbols and signs.

The names are seperated by a comma.

Only return one of the name that sound the most like a human name.

No preceeding text explaining how you took your decision.
`;

export const confirmNamePrompt = `Return "Yes" or "No" for this question.

Ignoring numbers or symbols in the name.

Is the name below a human name or a human nickname ?
`;

getNameRouterToPersonalizeDmRouter.post("/", async (req, res) => {
  const bodyRequest = await req.body;

  // const resultOfTokenValidation = await isTokenValid(bodyRequest);

  // if (resultOfTokenValidation.nullJWTToken)
  //   return res.json({ nullJWTToken: true });

  // if (resultOfTokenValidation.invalidToken)
  //   return res.json({ invalidToken: true });

  // if (resultOfTokenValidation.blacklistedEmail) {
  //   console.log("blacklistedEmail", resultOfTokenValidation.blacklistedEmail);
  //   return res.json({
  //     clientNameResponse: "Hadhri",
  //   });
  // }

  const { username, displayName } = bodyRequest;

  try {
    const finalName = await getNameToPersonlizeMessage(username, displayName);

    // console.log("name to use for dm", finalName);

    const namesArray = finalName ? finalName.split(" ") : "there";

    if (namesArray.length == 1) {
      if (finalName.includes("there")) {
        return res.json({
          finalName,
        });
      }
      const pureName = await isNameAMixtureOfTwoNames(finalName);
      //return final shit still
      return res.json({
        finalName: pureName,
      });
    }

    const finalNameNow = await confirmAllAreRealNames(namesArray);

    return res.json({
      finalName: finalNameNow,
    });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

async function getNameToPersonlizeMessage(username, displayName) {
  const isUsernameAHumanName = await getNameToGreetWithFromAi(
    confirmNamePrompt,
    username
  );

  const isDisplayNameAHumanName = await getNameToGreetWithFromAi(
    confirmNamePrompt,
    displayName
  );

  if (isUsernameAHumanName == "No" && isDisplayNameAHumanName == "No") {
    // console.log("None are human names");

    return "there";
  }

  if (isUsernameAHumanName == "Yes" && isDisplayNameAHumanName == "Yes") {
    const namesNow = `${displayName}, ${username}`;

    const theMostHumanName = await getNameToGreetWithFromAi(
      gettingNameToUseBtwUsernameAndDisplayNamePrompt,
      namesNow
    );

    // console.log("theMostHumanName", theMostHumanName);

    return theMostHumanName;
  }

  if (isUsernameAHumanName == "Yes") {
    return username;
  }

  if (isDisplayNameAHumanName == "Yes") {
    return displayName;
  }
}

export async function getNameToGreetWithFromAi(promptInstruction, prompt) {
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
      temperature: 0.1,
    });

    const fullResponse = response.choices[0]?.message?.content;

    return fullResponse; // Return the full response
  } catch (error) {
    return "error occured";
  }
}

export default getNameRouterToPersonalizeDmRouter;
