import express from "express";
import coookieParser from "cookie-parser";
const signInRouter = express.Router();

signInRouter.use(coookieParser());

import getSecretKeys from "../../../envVariables/envVariables.js";
import signInDetailsValidation from "../../../server-utils/joi-validations/sign-in/signInValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../../../server-utils/database/usersDb.js";

signInRouter.post("/", async (req, res) => {
  //get request sent
  const bodyRequest = await req.body;
  const keysObject = getSecretKeys();
  const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

  console.log(req.cookies["wfrAuth"]);

  const { error } = signInDetailsValidation(bodyRequest);

  if (error) return res.json({ emailError: error.details[0].message });

  const accountUser = await user.findOne({ email: bodyRequest.email });

  if (!accountUser)
    return res.json({ invalidLoginDetails: "Invalid email or password" });
  const validPassword = await bcrypt.compare(
    bodyRequest.password,
    accountUser.password
  );
  if (!validPassword)
    return res.json({ invalidLoginDetails: "Invalid email or password" });
  const token = jwt.sign(
    { _id: accountUser._id, isPaid: accountUser.isPaid },
    JWT_PRIVATE_KEY
  );

  // Setting the cookie
  return res
    .cookie("wfrAuth", token, {
      maxAge: 1209600000, // 14 days
      httpOnly: true,
      secure: true,
    })
    .json({ token });
});

export default signInRouter;
