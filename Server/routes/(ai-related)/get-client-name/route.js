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

const getClientNamePromptHeading = `What first one word is a real human name?`;

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

  const { part1, part2, part3 } = splitTextIntoThreeParts(prompt);

  const wordsLengthTotal = getTotalWordsLength(prompt);

  // console.log("wordsLengthTotal", wordsLengthTotal);

  try {
    //if it's a short prompt
    if (wordsLengthTotal < 70) {
      let clientNameResponseRaw = await getResponseFromAi(prompt);

      const cleanedClientName = processClientNameGotten(clientNameResponseRaw);
      const cleanedNameLength = getTotalWordsLength(cleanedClientName);

      console.log(
        "less than 70 words",
        clientNameResponseRaw,
        cleanedClientName
      );

      if (cleanedNameLength > 4) {
        const clientNameResponseRaw = await getResponseFromAi(
          cleanedClientName
        );

        const cleanedClientName = processClientNameGotten(
          clientNameResponseRaw
        );

        return res.json({ clientNameResponse: cleanedClientName });
      } else {
        return res.json({ clientNameResponse: cleanedClientName });
      }
    }

    let clientNameResponseRaw = await getResponseFromAi(part1);

    const cleanedClientName = processClientNameGotten(clientNameResponseRaw);

    console.log("first part cleaned", clientNameResponseRaw, cleanedClientName);

    if (
      cleanedClientName == "Hi there" ||
      clientNameResponseRaw == "." ||
      clientNameResponseRaw.includes("ignored")
    ) {
      //second part check

      let clientNameResponseRaw = await getResponseFromAi(part2);

      const cleanedClientName = processClientNameGotten(clientNameResponseRaw);

      console.log("2nd part cleaned", clientNameResponseRaw, cleanedClientName);

      if (
        cleanedClientName == "Hi there" ||
        clientNameResponseRaw == "." ||
        clientNameResponseRaw.includes("ignored")
      ) {
        let clientNameResponseRaw = await getResponseFromAi(part3);

        const cleanedClientName = processClientNameGotten(
          clientNameResponseRaw
        );

        const thirdCleanClientName = cleanedClientName;

        console.log(
          "3rd part cleaned",
          clientNameResponseRaw,
          cleanedClientName
        );

        const cleanedNameLength = getTotalWordsLength(thirdCleanClientName);

        if (cleanedNameLength > 4) {
          const clientNameResponseRaw = await getResponseFromAi(
            thirdCleanClientName
          );

          const cleanedClientName = processClientNameGotten(
            clientNameResponseRaw
          );

          return res.json({ clientNameResponse: cleanedClientName });
        }

        return res.json({ clientNameResponse: cleanedClientName });
      } else {
        const cleanedNameLength = getTotalWordsLength(cleanedClientName);

        if (cleanedNameLength > 4) {
          const clientNameResponseRaw = await getResponseFromAi(
            cleanedClientName
          );

          const cleanedClientName = processClientNameGotten(
            clientNameResponseRaw
          );

          return res.json({ clientNameResponse: cleanedClientName });
        }
        return res.json({ clientNameResponse: cleanedClientName });
      }

      // return res.json({ clientNameResponse: cleanedClientName });
    } else {
      const cleanedNameLength = getTotalWordsLength(cleanedClientName);

      if (cleanedNameLength > 4) {
        const clientNameResponseRaw = await getResponseFromAi(
          cleanedClientName
        );

        const cleanedClientName = processClientNameGotten(
          clientNameResponseRaw
        );

        return res.json({ clientNameResponse: cleanedClientName });
      }
      return res.json({ clientNameResponse: cleanedClientName });
    }
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

async function getResponseFromAi(prompt) {
  const result = await hf.questionAnswering({
    model: model,
    inputs: {
      //instruction for what to extract
      question: getClientNamePromptHeading,
      //freelancers feedback
      context: prompt,
    },
  });

  return result.answer;
}

export default getClientNameRouter;
