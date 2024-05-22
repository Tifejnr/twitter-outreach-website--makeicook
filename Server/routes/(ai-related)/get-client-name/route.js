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

  try {
    //if it's a short prompt
    if (wordsLengthTotal < 30) {
      const result = await hf.questionAnswering({
        model: model,
        inputs: {
          //instruction for what to extract
          question: getClientNamePromptHeading,
          //freelancers feedback
          context: prompt,
        },
      });

      let clientNameResponseRaw = result.answer;

      const cleanedClientName = processClientNameGotten(clientNameResponseRaw);

      console.log(
        "less than 30 words",
        clientNameResponseRaw,
        cleanedClientName
      );

      return res.json({ clientNameResponse: cleanedClientName });
    }

    //check if it's because prompt is too long
    // if (
    //   clientNameResponseRaw == "." ||
    //   clientNameResponseRaw.includes("ignored")
    // ) {
    const result = await hf.questionAnswering({
      model: model,
      inputs: {
        //instruction for what to extract
        question: getClientNamePromptHeading,
        //freelancers feedback
        context: part1,
      },
    });

    let clientNameResponseRaw = result.answer;

    const cleanedClientName = processClientNameGotten(clientNameResponseRaw);

    console.log("first part cleaned", clientNameResponseRaw, cleanedClientName);

    if (
      cleanedClientName == "Hi there" ||
      clientNameResponseRaw == "." ||
      clientNameResponseRaw.includes("ignored")
    ) {
      //second part check
      const result = await hf.questionAnswering({
        model: model,
        inputs: {
          //instruction for what to extract
          question: getClientNamePromptHeading,
          //freelancers feedback
          context: part2,
        },
      });

      let clientNameResponseRaw = result.answer;

      const cleanedClientName = processClientNameGotten(clientNameResponseRaw);

      console.log("2nd part cleaned", clientNameResponseRaw, cleanedClientName);

      if (
        cleanedClientName == "Hi there" ||
        clientNameResponseRaw == "." ||
        clientNameResponseRaw.includes("ignored")
      ) {
        //second part check
        const result = await hf.questionAnswering({
          model: model,
          inputs: {
            //instruction for what to extract
            question: getClientNamePromptHeading,
            //freelancers feedback
            context: part3,
          },
        });

        let clientNameResponseRaw = result.answer;

        const cleanedClientName = processClientNameGotten(
          clientNameResponseRaw
        );

        console.log(
          "3rd part cleaned",
          clientNameResponseRaw,
          cleanedClientName
        );

        return res.json({ clientNameResponse: cleanedClientName });
      } else {
        return res.json({ clientNameResponse: cleanedClientName });
      }

      // return res.json({ clientNameResponse: cleanedClientName });
    } else {
      return res.json({ clientNameResponse: cleanedClientName });
    }
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

export default getClientNameRouter;
