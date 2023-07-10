const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 40,
  },
  email: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 250,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1250,
  },
  entryCode: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 40,
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

  paidFor: {
    type: String,
    minlength: 2,
    maxlength: 1250,
    default: "NA",
  },
  profileLink: {
    type: String,
    maxlength: 1000,
    default: "NA",
  },
  jobsCompleted: {
    type: Number,
    max: 15,
    min: 0,
    default: 0,
  },
  jobsToBeCompleted: {
    type: Number,
    max: 15,
    min: 0,
    default: 0,
  },
});

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, JWT_PRIVATE_KEY);
//   return token;
// };

const user = mongoose.model("Users", userSchema);

function validateUsers(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(250).required().email(),
    password: Joi.string().min(3).max(250).required(),
    entryCode: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(user);
}

exports.user = user;
exports.validate = validateUsers;
