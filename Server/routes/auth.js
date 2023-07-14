const { user } = require("../models/users");
const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const { signJwt } = require("../middlewares/jwt-related/sign-jwt");
const { validateSignInParams } = require("../Joi-Validations/SignIn");

// res.cookie("cftAuth", jwtToken, {
//   maxAge: 1209600000,
// });

router.post("/", async (req, res) => {
  const { error } = validateSignInParams(req.body);

  if (error)
    return res.status(400).json({ joiError: error.details[0].message });

  res.cookie("mancftAuthaaa", "token");

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

    if (!token) return console.log("token not found");
    const cookieOptions = {
      maxAge: 1209600000,
      // httpOnly: true,
    };

    console.log("signed in");

    res.cookie("cftAuth", token, cookieOptions).json({ signedIn: true });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

module.exports = router;
