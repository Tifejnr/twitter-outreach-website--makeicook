const { user } = require("/root/Wfr-Digital-Ocean/models/users");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const _ = require("lodash");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const coookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const Joi = require("joi");
const { getSecretKeys } = require("/root/Wfr-Digital-Ocean/envVariables");

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(250).required().email(),
  });

  return schema.validate(req);
}

router.post("/", async (req, res) => {
  const keysObject = getSecretKeys();
  const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;
  const emailUsername = keysObject.emailUsername;
  const emailPassword = keysObject.emailPassword;

  const { error } = validate(req.body);
  if (error)
    return res.status(400).json({ emailError: error.details[0].message });
  const accountUser = await user.findOne({ email: req.body.email });
  if (!accountUser)
    return res.status(400).json({ notFoundUser: "User not found" });

  const secret = JWT_PRIVATE_KEY + accountUser.password;
  const payload = {
    email: accountUser.email,
    id: accountUser.id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "10m" });
  const link = `https://workforreputation.com/api/forgot-password/${accountUser.id}/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUsername,
      pass: emailPassword,
    },
  });

  const result = await transporter.sendMail({
    from: emailUsername,
    to: `${accountUser.email}`,
    subject: "Password Reset",
    text: `  	
        Hi ${accountUser.name},

        A password reset event has been triggered. The password reset window is limited to 20 minutes.

        If you do not reset your password within 20 minutes, you will need to submit a new request.

        To complete the password reset process, visit the following link:

        ${link}`,
  });

  if (result) return res.json({ emailSent: true });
});

router.get("/:id/:token", async (req, res) => {
  const id = req.params.id;
  res.cookie("reset_id", id, { maxAge: 100000, httpOnly: true });
  const token = req.params.token;
  const accountUser = await user.findOne({ _id: id });
  if (!accountUser)
    return res.status(400).json({ notFoundUser: "User not found" });

  try {
    const verifiedToken = jwt.verify(token, secret);
    if (verifiedToken)
      return res
        .cookie("reset_pass", token, { maxAge: 100000, httpOnly: true })
        .render("reset-password");
  } catch (error) {
    res.send({ tokenExpired: true });
  }
});

router.post("/:id/:token", async (req, res) => {
  const keysObject = getSecretKeys();
  const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

  const newPassword = req.body.password;
  const token = req.cookies.reset_pass;
  const userId = req.cookies.reset_id;

  const accountUser = await user.findOne({ _id: userId });
  if (!accountUser)
    return res.status(400).json({ UsernotFound: "User not found" });

  try {
    const secret = JWT_PRIVATE_KEY + accountUser.password;
    const decodedPayload = jwt.verify(token, secret);

    if (!decodedPayload) return res.json({ error: "token invalid" });

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(newPassword, salt);

    accountUser.set({
      password: hashedPassword,
    });

    const passwordUpdated = await accountUser.save();

    if (passwordUpdated) return res.json({ passwordUpdated: true });
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});

module.exports = router;
