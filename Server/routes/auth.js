const { user } = require("../models/users");
const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const { signJwt } = require("../middlewares/jwt-related/sign-jwt");
const { validateSignInParams } = require("../Joi-Validations/SignIn");

router.post("/", async (req, res) => {
  const { error } = validateSignInParams(req.body);
  if (error)
    return res.status(400).json({ joiError: error.details[0].message });

  try {
    const accountUser = await user.findOne({ email: req.body.email });
    if (!accountUser)
      return res
        .status(401)
        .json({ invalidLoginDetails: "Invalid email or password" });
    const validPassword = await bycrypt.compare(
      req.body.password,
      accountUser.password
    );
    if (!validPassword)
      return res
        .status(401)
        .json({ invalidLoginDetails: "Invalid email or password" });

    const token = await signJwt(accountUser);

    res
      .cookie("cftAuth", token, {
        maxAge: 1209600000,
        httpOnly: true,
        secure: true,
      })
      .json({ signedIn: true });

    console.log("signed in");
  } catch (error) {
    console.log(error);

    return res.json({ error });
  }
});
module.exports = router;
