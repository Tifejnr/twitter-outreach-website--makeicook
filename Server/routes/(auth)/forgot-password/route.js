import express from "express";
import user from "../../../server-utils/database/usersDb.js";
import forgotPasswordValidation from "../../../server-utils/joi-validations/forgot-password-req/forgotPasswordValidation.js";
import jwt from "jsonwebtoken";
import sendEmail from "../../../server-utils/emailTemplates/sendEmail.js";
import emailTemplateFolderSrc from "../../../server-utils/emailTemplates/template-folder-src/emailTemplateFolderSrc.js";
import getSecretKeys from "../../../envVariables/envVariables.js";

const forgotPasswordRouter = express.Router();

const keysObject = getSecretKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

// const websiteUrl = "http://localhost:5173";
const websiteUrl = "https://workforreputation.com";

forgotPasswordRouter.post("/", async (req, res) => {
  const bodyRequest = await req.body;

  const { error } = forgotPasswordValidation(bodyRequest);

  if (error) return res.json({ emailError: error.details[0].message });

  try {
    const accountUser = await user.findOne({ email: bodyRequest.email });
    if (!accountUser) return res.json({ notFoundUser: "User not found" });

    const secret = JWT_PRIVATE_KEY + accountUser.password;
    const payload = {
      email: accountUser.email,
      id: accountUser.id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "10m" });
    const link = `${websiteUrl}/reset-password/${accountUser.id}/${token}`;

    const emailContextParamsNow = {
      link,
      name: accountUser.name,
    };

    const subject = "Reset Password";
    const folderDir = `${emailTemplateFolderSrc}/reset-password-hbs`;

    const customerParams = {
      subject: subject,
      folderDir: folderDir,
      customerEmail: accountUser.email,
    };

    const result = await sendEmail(customerParams, emailContextParamsNow);

    if (result)
      return res.json({
        emailSent: true,
        userId: accountUser.id,
        forgotPassToken: token,
      });

    return res.json({
      emailNotSentError: true,
    });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

export default forgotPasswordRouter;
