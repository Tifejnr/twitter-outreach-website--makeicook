import Joi from "joi";

export type ExtensionSignUpValidationParams = {
  name: string;
  email: string;
  password: string;
  fromExtension: boolean;
};

export default function extensionSignUpValidation(
  reqBody: ExtensionSignUpValidationParams
) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(150).required(),
    email: Joi.string().min(3).max(250).required().email(),
    password: Joi.string().min(3).max(250).required(),
    fromExtension: Joi.boolean().required(),
  });

  return schema.validate(reqBody);
}
