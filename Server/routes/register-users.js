const { user } = require("../models/users");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const _ = require("lodash");
const bycrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const coookieParser = require("cookie-parser");
const { getSecretKeys } = require("/root/Wfr-Digital-Ocean/envVariables");
const {
  getFirst3Letters,
} = require("/root/Wfr-Digital-Ocean/middleware/verifyAmountFromClient");

router.post("/", async (req, res) => {
  const keysObject = getSecretKeys();
  const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;
  const entry_code = keysObject.entry_code;
  const TIFE_ENTRY_CODE = keysObject.TIFE_ENTRY_CODE;

  const { error } = validate(req.body);
  if (error)
    return res.status(400).json({ emailError: error.details[0].message });
  const entryCode = req.body.entryCode;
  if (!(entryCode == entry_code || entryCode == TIFE_ENTRY_CODE))
    return res.status(400).json({ invalidCode: "Invalid Entry Code" });

  let accountUser = await user.findOne({ email: req.body.email });
  if (accountUser)
    return res
      .status(400)
      .json({ alreadyRegistered: "User already registered" });
  accountUser = new user(
    _.pick(req.body, ["name", "email", "password", "entryCode"])
  );

  const salt = await bycrypt.genSalt(11);
  accountUser.password = await bycrypt.hash(accountUser.password, salt);
  const isPaidAlready = getFirst3Letters(entryCode);

  if (isPaidAlready == "lam") {
    accountUser.isPaid = true;
  }

  await accountUser.save();

  const token = jwt.sign(
    { _id: accountUser._id, isPaid: accountUser.isPaid },
    JWT_PRIVATE_KEY
  );
  const finalResult = _.pick(accountUser, ["_id", "name", "email"]);
  res
    .cookie("xAuth", token, {
      maxAge: 1209600000,
      httpOnly: true,
      secure: true,
    })
    .send(finalResult);
});

module.exports = router;
