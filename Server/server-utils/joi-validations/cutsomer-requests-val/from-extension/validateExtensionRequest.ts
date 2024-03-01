import Joi from "joi";

type ExtensionRequestType = {
  description: string;
  requestHeader: string;
  token: string;
  fromExtension: boolean;
};

export default function validateExtensionRequest(req: ExtensionRequestType) {
  const schema = Joi.object({
    description: Joi.string().min(3).max(2550).required(),
    requestHeader: Joi.string().min(5).max(150).required(),
    token: Joi.string().min(5).max(1250).required(),
    fromExtension: Joi.boolean().required(),
  });

  return schema.validate(req);
}
