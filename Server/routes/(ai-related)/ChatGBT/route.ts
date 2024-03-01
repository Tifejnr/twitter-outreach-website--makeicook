import { NextRequest, NextResponse } from "next/server";
import isTokenValid from "../../middleware/isTokenValid";
import OpenAI from "openai";
import chatGPTRequestVal from "@/app/server-utils/joi-validations/chat-gpt-request-val/chatGPTRequestVal";

export async function POST(req: NextRequest) {
  const bodyRequest = await req.json();

  const resultOfTokenValidation = await isTokenValid(bodyRequest);

  if (resultOfTokenValidation.nullJWTToken)
    return Response.json({ nullJWTToken: true });

  if (resultOfTokenValidation.invalidToken)
    return Response.json({ invalidToken: true });

  const { error } = chatGPTRequestVal(bodyRequest);

  if (error) return Response.json({ emailError: error.details[0].message });

  try {
    //connect open ai key of user
    const { openAiKey } = bodyRequest;

    const configuration = {
      apiKey: openAiKey,
    };

    const openai = new OpenAI(configuration);

    // const completion = await openai.chat.completions.create({
    //   model: "text-davinci-003",
    //   prompt: bodyRequest.prompt,
    //   temperature: bodyRequest.temperature,
    //   max_tokens: bodyRequest.maxToken,
    //   top_p: 1,
    //   frequency_penalty: 0.5,
    //   presence_penalty: 1,
    // });

    // Response.json({ bot: completion.data.choices[0].text });

    Response.json({ bot: true });
  } catch (error) {
    console.log("error,", error);

    return Response.json({ error: "Internal server error" });
  }
}
