import express from "express";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
// import openai from "openai";
import OpenAI from "openai";
import chatGPTRequestVal from "../../../server-utils/joi-validations/chat-gpt-request-val/chatGPTRequestVal.js";

const chatGPTAIResponseRouter = express.Router();

chatGPTAIResponseRouter.post("/", async (req, res) => {
  const bodyRequest = await req.body;

  // const resultOfTokenValidation = await isTokenValid(bodyRequest);

  // if (resultOfTokenValidation.nullJWTToken)
  //   return res.json({ nullJWTToken: true });

  // if (resultOfTokenValidation.invalidToken)
  //   return res.json({ invalidToken: true });

  const { error } = chatGPTRequestVal(bodyRequest);

  if (error) return res.json({ emailError: error.details[0].message });

  try {
    //connect open ai key of user
    const { openAiKey, prompt, maxToken, temperature } = bodyRequest;

    // Configure OpenAI
    const openai = new OpenAI({
      apiKey: openAiKey, // This is also the default, can be omitted
    });

    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      max_tokens: maxToken,
      temperature: temperature,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 1,
    });

    res.json({ bot: completion.data.choices[0].text });
  } catch (error) {
    let errorMessage;
    if (error instanceof OpenAI.APIError) {
      if (error.status) {
        errorMessage = error.status; // e.g. 401
      }

      if (error.message) {
        errorMessage = error.message; // e.g. 401
      }

      if (error.code) {
        errorMessage = error.code; // e.g. 401
      }

      if (error.type) {
        errorMessage = error.type; // e.g. 401
      }
      if (error.error.message) {
        errorMessage = error.error.message; // e.g. 401
      }

      console.log(error.error.message);

      return res.json({ error: errorMessage });
    } else {
      // Non-API error
      console.log(error);

      res.json({ error: error });
    }
  }
});

export default chatGPTAIResponseRouter;
