import Joi from "joi";

export default function forgotPasswordValidation(req) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(250).required().email(),
  });

  return schema.validate(req);
}
