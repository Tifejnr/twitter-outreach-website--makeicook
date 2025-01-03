import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import _ from "lodash";
import user from "../../../server-utils/database/usersDb.js";
import websiteSignUpValidation from "../../../server-utils/joi-validations/sign-up/websiteSignUpValidation.js";
import extensionSignUpValidation from "../../../server-utils/joi-validations/sign-up/extensionSignUpValidation.js";
import getFirst3Letters from "../../../server-utils/users-identifers/getFirst3Letters.js";
import getSecretKeys from "../../../envVariables/envVariables.js";
import emailTemplateFolderSrc from "../../../server-utils/emailTemplates/template-folder-src/emailTemplateFolderSrc.js";
import getFirstName from "../../(customer-requests)/email-users/getFirstname.js";
import sendEmail from "../../../server-utils/emailTemplates/sendEmail.js";
import entryCodesArray from "./entry-codes-array/entryCodesArray.js";
import isJosephEntryCodesArrayValid from "./entry-codes-array/josephEntryCodesArray.js";

const signUpRouter = express.Router();

signUpRouter.post("/", async (req, res) => {
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

    const { entryCode, fromMakeICookExtension } = bodyRequest;

    if (error) return res.json({ joiError: error.details[0].message });

    let accountUser = await user.findOne({ email: bodyRequest.email });

    if (accountUser)
      return res.json({ alreadyRegistered: "User already registered" });

    accountUser = new user(_.pick(bodyRequest, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(11);

    accountUser.password = await bcrypt.hash(accountUser.password, salt);

    //is entry code valid
    const isEntryCodeValid = await isJosephEntryCodesArrayValid(entryCode);

    console.log("isEntryCodeValid", isEntryCodeValid, entryCode);

    const creditsToGiveUser =
      isEntryCodeValid === false ? 10 : isEntryCodeValid === null ? 20 : 30;

    accountUser.entryCode = isEntryCodeValid
      ? entryCode
      : keysObject.extensionEntryCode;

    accountUser.isEmailVerified = true;
    accountUser.credits = creditsToGiveUser;

    if (fromMakeICookExtension) {
      accountUser.fromMakeICookExtension = true;
    }

    await accountUser.save();

    const token = jwt.sign(
      { _id: accountUser._id, isPaid: accountUser.isPaid },
      JWT_PRIVATE_KEY
    );

    //send welcome to new user
    const subject = "Welcome to Twitter(X) Prospecting tool - Make I Cook!";
    const folderDir = `${emailTemplateFolderSrc}/welcome-email`;

    const fullName = bodyRequest.name;
    const customerEmail = bodyRequest.email;

    const name = getFirstName(fullName);

    const customerParams = {
      subject: subject,
      folderDir: folderDir,
      customerEmail,
    };

    const emailContextParamsNow = {
      name,
    };

    const result = await sendEmail(customerParams, emailContextParamsNow);

    // // const trialCreditsGivenEmailResult=
    // const trialCreditsSubject = `${name}, You’ve Received ${accountUser.credits} Free Credits – Here's How to Make the Most of Them!`;
    // const folderDirTrialCredits = `${emailTemplateFolderSrc}/trial-credits-given-email`;

    // const customerParamsTrialCredits = {
    //   subject: trialCreditsSubject,
    //   folderDir: folderDirTrialCredits,
    //   customerEmail,
    // };

    // const emailContextParamsNowTrialCredits = {
    //   customerName: name,
    //   credits: accountUser.credits,
    // };

    // await sendEmail(
    //   customerParamsTrialCredits,
    //   emailContextParamsNowTrialCredits
    // );

    if (result) {
      return res.json({ token });
    }

    return res.json({ token });
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

  accountUser = new user(
    _.pick(bodyRequest, ["name", "email", "password", "entryCode"])
  );

  const salt = await bcrypt.genSalt(11);
  accountUser.password = await bcrypt.hash(accountUser.password, salt);
  const isPaidAlready = getFirst3Letters(entryCode);

  if (isPaidAlready == keysObject.threeLetterslamzStudentsIdentifier) {
    accountUser.isPaid = true;
  }

  // accountUser.isEmailVerified = true;

  await accountUser.save();

  const token = jwt.sign(
    { _id: accountUser._id, isPaid: accountUser.isPaid },
    JWT_PRIVATE_KEY
  );

  return res.json({ token });
});

export default signUpRouter;
