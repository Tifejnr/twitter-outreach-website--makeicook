import express from "express";
const signInRouter = express.Router();

import getSecretKeys from "../../../envVariables/envVariables.js";
import signInDetailsValidation from "../../../server-utils/joi-validations/sign-in/signInValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../../../server-utils/database/usersDb.js";

signInRouter.post("/", async (req, res) => {
  console.log("response.headers.origin", req.headers.origin);
  //get request sent
  const bodyRequest = await req.body;
  const keysObject = getSecretKeys();
  const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

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
  // .cookie("wfrAuth", token, {
  //   maxAge: 1209600000, // 14 days
  //   httpOnly: true,
  //   secure: true,
  //   path: "chrome-extension://chpmkkhcpfhjdkkeiggiicfejnkhcidb/sidepanel.html",
  // })
  return res.json({ token });
});

export default signInRouter;
