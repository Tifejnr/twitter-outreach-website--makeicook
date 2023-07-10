function validateRegsiterParams(reqBody) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(250).required().email(),
    password: Joi.string().min(3).max(250).required(),
  });

  return schema.validate(reqBody);
}
exports.validateRegsiterParams = validateRegsiterParams;
