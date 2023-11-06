const { user } = require("../models/users");
const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const { signJwt } = require("../middlewares/jwt-related/sign-jwt");
const { validateSignInParams } = require("../Joi-Validations/SignIn");
const {
  decryptExtensionKey,
} = require("../middlewares/extensionKey-safety/decryptExtensionKey");

trialKey = `12fe-Bu6t-3atb-io3w-1dad-w04l-e82Q-es02-120e-07`;

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validateSignInParams(req.body);

  // console.log("error", error.details[0].message);

  if (error)
    return res.status(400).json({ joiError: error.details[0].message });

  try {
    const accountUser = await user.findOne({ email: req.body.email });
    if (!accountUser) {
      res
        .status(401)
        .json({ invalidLoginDetails: "Invalid email or extension key" });

      return;
    }

    //decrypt user database key and check if it matches one sent from the client
    const userDbEncryptedKey = await decryptExtensionKey(accountUser._id);

    if (userDbEncryptedKey !== req.body.extensionKey) {
      res
        .status(401)
        .json({ invalidLoginDetails: "Invalid email or extension key" });

      return;
    }

    const token = await signJwt(accountUser);

    if (!token) return console.log("token not found");

    console.log("signed in");

    return res.json({ signedIn: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

module.exports = router;
