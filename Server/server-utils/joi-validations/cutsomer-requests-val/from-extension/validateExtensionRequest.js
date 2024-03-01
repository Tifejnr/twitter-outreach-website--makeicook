import Joi from "joi";

export default function validateExtensionRequest(req) {
  const schema = Joi.object({
    description: Joi.string().min(3).max(2550).required(),
    requestHeader: Joi.string().min(5).max(150).required(),
    token: Joi.string().min(5).max(1250).required(),
    fromExtension: Joi.boolean().required(),
  });

  return schema.validate(req);
}
