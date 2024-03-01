import Joi from "joi";

export type WebsiteSignUpValidationParams = {
  name: string;
  email: string;
  password: string;
  entryCode: string;
};

export default function websiteSignUpValidatio(
  reqBody: WebsiteSignUpValidationParams
) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(250).required().email(),
    password: Joi.string().min(3).max(250).required(),
    entryCode: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(reqBody);
}
