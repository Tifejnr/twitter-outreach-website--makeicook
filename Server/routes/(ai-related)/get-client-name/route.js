import express from "express";
import { HfInference } from "@huggingface/inference";
import forbiddenNames from "./forbiddenNames.js";
import forbiddenNamesInclusionArray from "./forbiddenNamesInclusion.js";
import getSecretKeys from "../../../envVariables/envVariables.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";

const keysObject = getSecretKeys();
const model = keysObject.huggingFaceModel;
const HF_TOKEN = keysObject.HF_TOKEN;
const hf = new HfInference(HF_TOKEN);

const getClientNamePromptHeading = `What one word is a real human name?`;

const getClientNameRouter = express.Router();

getClientNameRouter.post("/", async (req, res) => {
  const bodyRequest = await req.body;

  const resultOfTokenValidation = await isTokenValid(bodyRequest);

  if (resultOfTokenValidation.nullJWTToken)
    return res.json({ nullJWTToken: true });

  if (resultOfTokenValidation.invalidToken)
    return res.json({ invalidToken: true });

  const { prompt } = bodyRequest;
  try {
    const result = await hf.questionAnswering({
      model: model,
      inputs: {
        //instruction for what to extract
        question: getClientNamePromptHeading,
        //freelancers feedback
        context: prompt,
      },
    });

    let clientNameResponse = result.answer;
    const clientNameResponseLowercase = clientNameResponse.toLowerCase();

    if (
      forbiddenNames.some(
        (forbiddenName) =>
          forbiddenName.toLowerCase() == clientNameResponseLowercase
      )
    ) {
      clientNameResponse = "Hi there";
    } else if (
      forbiddenNamesInclusionArray.some((forbiddenName) =>
        forbiddenName.toLowerCase().includes(clientNameResponseLowercase)
      )
    ) {
      clientNameResponse = "Hi there";
    }

    console.log("result is", result.answer, clientNameResponse);

    return res.json({ clientNameResponse });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

export default getClientNameRouter;
