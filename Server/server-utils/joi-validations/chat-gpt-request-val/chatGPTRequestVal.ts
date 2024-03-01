import Joi from "joi";

type ChatGPTRequestType = {
  prompt: string;
  openAiKey: string;
  temperature: number;
  maxToken: number;
};

export default function chatGPTRequestVal(reqBody: ChatGPTRequestType) {
  const schema = Joi.object({
    prompt: Joi.string().min(3).max(20050).required(),
    openAiKey: Joi.string().min(10).max(1050).required(),
    temperature: Joi.number().positive().min(0).max(1).required(),
    maxToken: Joi.number().positive().integer().min(100).max(30000).required(),
  });

  return schema.validate(reqBody);
}
