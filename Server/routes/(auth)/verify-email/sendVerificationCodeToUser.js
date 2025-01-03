import express from "express";
import _ from "lodash";
import user from "../../../server-utils/database/usersDb.js";
import websiteSignUpValidation from "../../../server-utils/joi-validations/sign-up/websiteSignUpValidation.js";
import extensionSignUpValidation from "../../../server-utils/joi-validations/sign-up/extensionSignUpValidation.js";
import getSecretKeys from "../../../envVariables/envVariables.js";
import sendEmail from "../../../server-utils/emailTemplates/sendEmail.js";
import emailTemplateFolderSrc from "../../../server-utils/emailTemplates/template-folder-src/emailTemplateFolderSrc.js";
import getFirstName from "../../(customer-requests)/email-users/getFirstname.js";

const sendEmailVerificationCodeRouter = express.Router();

// Utility function to generate a 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
};

sendEmailVerificationCodeRouter.post("/", async (req, res) => {
  //get request sent
  const bodyRequest = await req.body;
  const { fromExtension, password } = bodyRequest;
  const keysObject = getSecretKeys();
  const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;
  const entry_code = keysObject.entry_code;
  const TIFE_ENTRY_CODE = keysObject.TIFE_ENTRY_CODE;

  //if from extension
  if (fromExtension) {
    const { error } = extensionSignUpValidation(bodyRequest);

    if (error) return res.json({ joiError: error.details[0].message });

    const accountUser = await user.findOne({ email: bodyRequest.email });

    if (accountUser)
      return res.json({ alreadyRegistered: "User already registered" });

    // Generate a 6-digit code
    const verificationCode = generateVerificationCode();

    console.log("verificationCode", verificationCode);

    //send code to user email
    const subject =
      "New Registration - Verification Required - Twitter(X) Prospecting tool";
    const folderDir = `${emailTemplateFolderSrc}/email-verification`;

    const fullName = bodyRequest.name;
    const customerEmail = bodyRequest.email;

    const name = getFirstName(fullName);

    const customerParams = {
      subject: subject,
      folderDir: folderDir,
      customerEmail,
    };

    const emailContextParamsNow = {
      verificationCode,
      name,
    };

    const result = await sendEmail(customerParams, emailContextParamsNow);

    if (result) {
      return res.json({ isAccountOkay: verificationCode });
    }

    return res.json({ anErrorOccured: true });
  }

  //normal website login
  const { error } = websiteSignUpValidation(bodyRequest);
  if (error) return res.json({ emailError: error.details[0].message });

  const entryCode = bodyRequest.entryCode;
  if (!(entryCode == entry_code || entryCode == TIFE_ENTRY_CODE))
    return res.json({ invalidCode: "Invalid Entry Code" });

  let accountUser = await user.findOne({ email: bodyRequest.email });

  if (accountUser)
    return res.json({ alreadyRegistered: "User already registered" });

  return res.json({ token });
});

export default sendEmailVerificationCodeRouter;
