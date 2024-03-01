import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import isTokenValid from "../../middleware/isTokenValid";
import forbiddenNames from "./forbiddenNames";
import { getSecretKeys } from "@/app/envVariables/envVariables";

// const model = "rsvp-ai/bertserini-bert-base-squad";
const keysObject = getSecretKeys();
const model = keysObject.huggingFaceModel;
const HF_TOKEN = keysObject.HF_TOKEN;
const hf = new HfInference(HF_TOKEN);

const getClientNamePromptHeading = `What one word is a real human name?`;

const clientText = "Client";
const clientTextSmallLetter = "client";

export async function POST(req: NextRequest) {
  const bodyRequest = await req.json();

  const resultOfTokenValidation = await isTokenValid(bodyRequest);

  if (resultOfTokenValidation.nullJWTToken)
    return Response.json({ nullJWTToken: true });

  if (resultOfTokenValidation.invalidToken)
    return Response.json({ invalidToken: true });

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

    if (
      forbiddenNames.some(
        (forbiddenName) => forbiddenName == clientNameResponse
      )
    ) {
      clientNameResponse = "Hi there";
    } else if (
      clientNameResponse.includes(clientText) ||
      clientNameResponse.includes(clientTextSmallLetter)
    ) {
      clientNameResponse = "Hi there";
    }

    console.log("result is", result.answer, clientNameResponse);

    return Response.json({ clientNameResponse });
  } catch (error) {
    console.log("error,", error);

    return Response.json({ error: "Internal server error" });
  }
}
