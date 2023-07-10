const { user } = require("../models/users");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const _ = require("lodash");
const bycrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const coookieParser = require("cookie-parser");
const { getSecretKeys } = require("/root/Wfr-Digital-Ocean/envVariables");

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(250).required().email(),
    password: Joi.string().min(3).max(250).required(),
  });

  return schema.validate(req);
}

router.post("/", async (req, res) => {
  const keysObject = getSecretKeys();
  const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;
  const { error } = validate(req.body);
  if (error)
    return res.status(400).json({ emailError: error.details[0].message });

  const accountUser = await user.findOne({ email: req.body.email });
  if (!accountUser)
    return res
      .status(400)
      .json({ invalidLoginDetails: "Invalid email or password" });
  const validPassword = await bycrypt.compare(
    req.body.password,
    accountUser.password
  );
  if (!validPassword)
    return res
      .status(400)
      .json({ invalidLoginDetails: "Invalid email or password" });
  const token = jwt.sign(
    { _id: accountUser._id, isPaid: accountUser.isPaid },
    JWT_PRIVATE_KEY
  );

  res
    .cookie("xAuth", token, {
      maxAge: 1209600000,
      httpOnly: true,
      secure: true,
    })
    .json({ token: "t" });
});
module.exports = router;
