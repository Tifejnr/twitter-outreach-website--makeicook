import express from "express";
import { HfInference } from "@huggingface/inference";
import forbiddenNames from "./forbiddenNames.js";
import forbiddenNamesInclusionArray from "./forbiddenNamesInclusion.js";
import getSecretKeys from "../../../envVariables/envVariables.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import containsOneCharacter from "./utils/doesItContainOneXter.js";
import removeAndTextFromClienName from "./utils/removeAndTextFromClienName.js";
import isNameAdecimalNumber from "./utils/isNameAdecimalNumber.js";
import splitTextIntoTwoParts from "./utils/splitTextsIntoTwoEqualParts.js";

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

  const { promptPart1, promptPart2 } = splitTextIntoTwoParts(prompt);

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

    //check if it's because prompt is too long
    if (clientNameResponseRaw == ".") {
      const result = await hf.questionAnswering({
        model: model,
        inputs: {
          //instruction for what to extract
          question: getClientNamePromptHeading,
          //freelancers feedback
          context: promptPart1,
        },
      });

      let clientNameResponseRaw = result.answer;

      console.log("clientNameResponseRaw", clientNameResponseRaw);

      if (clientNameResponseRaw == ".") {
        const result = await hf.questionAnswering({
          model: model,
          inputs: {
            //instruction for what to extract
            question: getClientNamePromptHeading,
            //freelancers feedback
            context: promptPart2,
          },
        });

        let clientNameResponseRaw = result.answer;

        console.log("clientNameResponseRaw", clientNameResponseRaw);

        return res.json({ clientNameResponse: clientNameResponseRaw });
      }

      return res.json({ clientNameResponse: clientNameResponseRaw });
    }

    let clientNameResponse = removeAndTextFromClienName(clientNameResponseRaw);
    clientNameResponse = clientNameResponse.replace(/\s{2,}/g, " ");

    const clientNameResponseLowercase = clientNameResponse.toLowerCase();

    const isForbiddenNameEqualtTo = forbiddenNames.find(
      (forbiddenName) =>
        forbiddenName.toLowerCase() == clientNameResponseLowercase
    );

    const isForbiddenNameIncludedIn = forbiddenNamesInclusionArray.find(
      (forbiddenName) =>
        new RegExp("\\b" + forbiddenName.toLowerCase() + "\\b").test(
          clientNameResponseLowercase
        )
    );

    const doesItContainOneXter = containsOneCharacter(
      clientNameResponseLowercase
    );

    const isNameDecimal = isNameAdecimalNumber(clientNameResponseLowercase);

    if (
      isForbiddenNameIncludedIn ||
      isForbiddenNameEqualtTo ||
      doesItContainOneXter ||
      isNameDecimal ||
      clientNameResponse.includes("ignored")
    ) {
      const includedForbiddenNames = forbiddenNamesInclusionArray.find(
        (forbiddenName) =>
          new RegExp("\\b" + forbiddenName.toLowerCase() + "\\b").test(
            clientNameResponseLowercase
          )
      );

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
