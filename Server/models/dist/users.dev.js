"use strict";

var mongoose = require("mongoose");

var Joi = require("joi");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 40,
    required: true
  },
  username: {
    type: String,
    minlength: 2,
    maxlength: 40,
    required: true
  },
  plan: {
    type: String,
    minlength: 4,
    maxlength: 20,
    "default": "Trial"
  },
  email: {
    type: String,
    minlength: 4,
    maxlength: 250,
    unique: true
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 1250
  },
  sessionSignature: {
    type: String,
    minlength: 2,
    maxlength: 50,
    "default": "Trialsig"
  },
  iv: {
    type: String,
    minlength: 1,
    maxlength: 50000,
    required: true
  },
  trello_token: {
    type: String,
    minlength: 1,
    maxlength: 122250,
    required: true
  },
  isPaid: {
    type: Boolean,
    "default": false
  },
  credits: {
    type: Number,
    max: 3000000000000,
    min: 0,
    "default": 0
  }
}); // userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, JWT_PRIVATE_KEY);
//   return token;
// };

var user = mongoose.model("CFTUsers", userSchema);
exports.user = user;