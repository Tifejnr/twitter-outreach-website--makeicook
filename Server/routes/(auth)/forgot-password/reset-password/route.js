import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import resetPasswordValidation from "../../../../server-utils/joi-validations/forgot-password-req/resetPasswordValidation.js";
import getSecretKeys from "../../../../envVariables/envVariables.js";
import user from "../../../../server-utils/database/usersDb.js";

const resetPasswordRouter = express.Router();

const keysObject = getSecretKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

resetPasswordRouter.post("/", async (req, res) => {
  const bodyRequest = await req.body;

  const { paramsToResetPassword } = bodyRequest;

  const { error } = resetPasswordValidation(paramsToResetPassword);

  if (error) return res.json({ joiError: error.details[0].message });

  const { userId, forgotPassToken, password } = paramsToResetPassword;

  try {
    const accountUser = await user.findOne({ _id: userId });
    if (!accountUser) return res.json({ UsernotFound: true });

    const secret = JWT_PRIVATE_KEY + accountUser.password;
    const decodedPayload = jwt.verify(forgotPassToken, secret);

    if (!decodedPayload) return res.json({ invalidToken: "token invalid" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    accountUser.set({
      password: hashedPassword,
    });

    const passwordUpdated = await accountUser.save();

    if (passwordUpdated) return res.json({ passwordUpdated: true });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error });
  }
});

export default resetPasswordRouter;
