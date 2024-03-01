import Joi from "joi";

type ContactUsRequestType = {
  customerEmail: string;
  message: string;
  customerName: string;
};

export default function contactUsReqVal(req: ContactUsRequestType) {
  const schema = Joi.object({
    message: Joi.string().min(3).max(2550).required(),
    customerName: Joi.string().min(5).max(250).required(),
    customerEmail: Joi.string().min(3).max(250).required().email(),
  });

  return schema.validate(req);
}
