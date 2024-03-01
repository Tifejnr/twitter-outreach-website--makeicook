import Joi from "joi";

type ReseyPasswordType = {
  userId: string;
  forgotPassToken: string;
  password: string;
};

export default function resetPasswordValidation(req: ReseyPasswordType) {
  const schema = Joi.object({
    userId: Joi.string().min(3).max(950).required(),
    forgotPassToken: Joi.string().min(3).max(3950).required(),
    password: Joi.string().min(3).max(2950).required(),
  });

  return schema.validate(req);
}
