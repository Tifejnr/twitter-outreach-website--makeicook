const Joi = require("joi");

function validateSignInParams(reqBody) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(250).required().email(),
    password: Joi.string().min(6).max(350).required(),
  });

  return schema.validate(reqBody);
}

// function validateUsers(user) {
//   const schema = Joi.object({
//     name: Joi.string().min(3).max(50).required(),
//     email: Joi.string().min(3).max(250).required().email(),
//     password: Joi.string().min(3).max(250).required(),
//   });

//   return schema.validate(user);
// }
// exports.validate = validateUsers;

exports.validateSignInParams = validateSignInParams;
