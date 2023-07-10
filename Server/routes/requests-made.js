const { user } = require("../models/users");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const coookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const Joi = require("joi");
const authChecker = require("../middleware/auth");
const { getSecretKeys } = require("/root/Wfr-Digital-Ocean/envVariables");

function validate(req) {
  const schema = Joi.object({
    message: Joi.string().min(3).max(550).required(),
    requestHeader: Joi.string().min(5).max(550).required(),
  });

  return schema.validate(req);
}

// Send Request to Support Email
router.post("/", authChecker, async (req, res) => {
  const keysObject = getSecretKeys();
  const emailUsername = keysObject.emailUsername;
  const emailPassword = keysObject.emailPassword;
  const supportEmail = keysObject.supportEmail;

  const { error } = validate(req.body);
  if (error)
    return res.status(400).json({ messageError: error.details[0].message });

  const accountUser = await user.findById(req.user._id);

  const message = req.body.message;
  const requestHeader = req.body.requestHeader;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUsername,
      pass: emailPassword,
    },
  });

  const requestSentToSupport = {
    from: emailUsername,
    to: supportEmail,
    subject: `${requestHeader} from ${accountUser.name}`,
    text: `  	
${accountUser.name} Request,

${message.trim()}`,
  };

  const result = await transporter.sendMail(
    requestSentToSupport,
    sendConfirmationToUser()
  );

  //Send Report To User

  async function sendConfirmationToUser() {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUsername,
        pass: emailPassword,
      },
    });

    const emailToUser = {
      from: emailUsername,
      to: accountUser.email,
      subject: `Request Received`,
      text: `
Hi, ${accountUser.name}, 
Your Request " ${requestHeader.trim()}", has been Received and will be Processed.
`,
    };

    const result = await transporter.sendMail(
      emailToUser,
      res.json({ emailSent: true })
    );
  }
});

module.exports = router;
