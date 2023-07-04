const Joi = require("joi");

function validateUserUid(reqBody) {
  const schema = Joi.object({
    userUid: Joi.string().min(3).max(80).required(),
  });

  return schema.validate(reqBody);
}

exports.validateUserUid = validateUserUid;
