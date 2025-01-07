import Joi from "joi";

function validateGetNamereq(reqBody) {
  const schema = Joi.object({
    getNameAndEmail: Joi.boolean().required(),
  });

  return schema.validate(reqBody);
}

function validatePaymentParams(reqBody) {
  const schema = Joi.object({
    planPrice: Joi.number().min(3).max(50000).required(),
    fromExtension: Joi.boolean().required(),
    token: Joi.string().required(),
  });

  return schema.validate(reqBody);
}

// function validateGetPricesReq(reqBody) {
//   const schema = Joi.object({
//     getPricesReq: Joi.boolean().required(),
//   });

//   return schema.validate(reqBody);
// }

export { validateGetNamereq, validatePaymentParams };
