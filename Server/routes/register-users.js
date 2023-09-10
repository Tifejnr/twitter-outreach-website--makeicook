const { user } = require("../models/users");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bycrypt = require("bcrypt");
const { signJwt } = require("../middlewares/jwt-related/sign-jwt");
const {
  validateRegsiterParams,
} = require("../Joi-Validations/register-validation");

router.post("/", async (req, res) => {
  const { error } = validateRegsiterParams(req.body);
  if (error)
    return res.status(400).json({ emailError: error.details[0].message });

  try {
    const accountUserExists = await user.findOne({ email: req.body.email });
    if (accountUserExists)
      return res
        .status(409)
        .json({ alreadyRegistered: "User already registered" });
    const accountUser = new user(_.pick(req.body, ["email", "password"]));

    const salt = await bycrypt.genSalt(11);
    accountUser.password = await bycrypt.hash(accountUser.password, salt);
    accountUser.credits = 5;

    await accountUser.save();

    console.log(accountUser);

    const token = await signJwt(accountUser);

    const cookieOptions = {
      maxAge: 1209600000,
      secure: true,
    };

    res
      .cookie("cftAuth", token, cookieOptions)
      .json({ registered: true, token });

    console.log("registered");
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

module.exports = router;
