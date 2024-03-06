import Joi from "joi";

export default function chatGPTRequestVal(reqBody) {
  const schema = Joi.object({
    prompt: Joi.string().min(3).max(2000050).required(),
    openAiKey: Joi.string().min(10).max(1050).required(),
    temperature: Joi.number().positive().min(0).max(1).required(),
    maxToken: Joi.number().positive().integer().min(100).max(30000).required(),
    token: Joi.string().min(5).max(1050),
    fromExtension: Joi.boolean(),
  });

  return schema.validate(reqBody);
}
