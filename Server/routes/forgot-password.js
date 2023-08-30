const { user } = require("../models/users");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../middlewares/Email-sending/emailTemplate");
const { validateEmail } = require("../Joi-Validations/emailAloneValidation");
const { getKeys } = require("../envKeys/allKeys");
const keysObject = getKeys();

router.post("/", async (req, res) => {
  const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

  const { error } = validateEmail(req.body);
  if (error)
    return res.status(400).json({ emailValError: error.details[0].message });
  const accountUser = await user.findOne({ email: req.body.email });
  if (!accountUser)
    return res.status(400).json({ notFoundUserEmail: "User not found" });

  const secret = JWT_PRIVATE_KEY + accountUser.password;
  const payload = {
    email: accountUser.email,
    id: accountUser.id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "10m" });
  const link = `https://workforreputation.com/api/forgot-password/${accountUser.id}/${token}`;

  const folderDir = "./reset-password-email";
  const subject = "Password Reset";
  const customerEmail = accountUser.email;
  const fullName = accountUser.name;

  const customerParams = {
    subject: subject,
    folderDir: folderDir,
    customerEmail: customerEmail,
  };

  const resetPasswordEmailContent = {
    fullName,
    resetPasswordLink: link,
  };

  const isEmailSentToUser = await sendEmail(
    customerParams,
    resetPasswordEmailContent
  );

  if (isEmailSentToUser.error)
    return res.status(402).json({ emailSentError: true });

  if (isEmailSentToUser.info) return res.status(200).json({ emailSent: true });
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
