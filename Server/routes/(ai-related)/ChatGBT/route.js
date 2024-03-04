import express from "express";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import openai from "openai";
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
    const { openAiKey } = bodyRequest;

    // Configure OpenAI
    const openaiInstance = new openai.OpenAIApi({
      apiKey: openAiKey,
    });

    // Use OpenAI instance to make requests
    const completion = await openaiInstance.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      temperature: req.body.temperature,
      max_tokens: req.body.maxToken,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 1,
    });

    res.json({ bot: completion.data.choices[0].text });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

export default chatGPTAIResponseRouter;
