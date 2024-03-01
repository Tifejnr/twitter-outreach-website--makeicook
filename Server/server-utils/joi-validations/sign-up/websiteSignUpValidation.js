import Joi from "joi";

export default function websiteSignUpValidation(reqBody) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(250).required().email(),
    password: Joi.string().min(3).max(250).required(),
    entryCode: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(reqBody);
}
