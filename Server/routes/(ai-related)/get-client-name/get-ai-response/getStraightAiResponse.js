import { HfInference } from "@huggingface/inference";

import getSecretKeys from "../../../../envVariables/envVariables";

const keysObject = getSecretKeys();
const model = keysObject.aiModel;
const HF_TOKEN = keysObject.HF_TOKEN;
const hf = new HfInference(HF_TOKEN);

async function getStraightAiResponse(
  promptInstruction,
  prompt,
  customTemperature
) {
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
      temperature: customTemperature ? customTemperature : 0.1,
    });

    const fullResponse = response.choices[0]?.message?.content;

    return fullResponse; // Return the full response
  } catch (error) {
    return "error occured";
  }
}

export default getStraightAiResponse;
