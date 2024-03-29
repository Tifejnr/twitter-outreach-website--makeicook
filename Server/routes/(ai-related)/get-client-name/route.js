import express from "express";
import { HfInference } from "@huggingface/inference";
import forbiddenNames from "./forbiddenNames.js";
import forbiddenNamesInclusionArray from "./forbiddenNamesInclusion.js";
import getSecretKeys from "../../../envVariables/envVariables.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import containsOneCharacter from "./utils/doesItContainOneXter.js";
import removeAndTextFromClienName from "./utils/removeAndTextFromClienName.js";

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

    let clientNameResponseRaw = result.answer;
    let clientNameResponse = removeAndTextFromClienName(clientNameResponseRaw);

    const clientNameResponseLowercase = clientNameResponse.toLowerCase();

    const isForbiddenNameEqualtTo = forbiddenNames.find(
      (forbiddenName) =>
        forbiddenName.toLowerCase() == clientNameResponseLowercase
    );

    const isForbiddenNameIncludedIn = forbiddenNamesInclusionArray.find(
      (forbiddenName) =>
        clientNameResponseLowercase.includes(forbiddenName.toLowerCase())
    );

    const doesItContainOneXter = containsOneCharacter(
      clientNameResponseLowercase
    );

    if (
      isForbiddenNameIncludedIn ||
      isForbiddenNameEqualtTo ||
      doesItContainOneXter
    ) {
      const includedForbiddenNames = forbiddenNamesInclusionArray.find(
        (forbiddenName) =>
          clientNameResponseLowercase.includes(forbiddenName.toLowerCase())
      );

      console.log("Forbidden name found:", includedForbiddenNames);
      clientNameResponse = "Hi there";
    }

    console.log("Name", result.answer, clientNameResponse);

    return res.json({ clientNameResponse });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

export default getClientNameRouter;
