import express from "express";
import contactUsReqVal from "../../../server-utils/joi-validations/cutsomer-requests-val/from-website/contactUsReqVal.js";
import getSecretKeys from "../../../envVariables/envVariables.js";
import emailTemplateFolderSrc from "../../../server-utils/emailTemplates/template-folder-src/emailTemplateFolderSrc.js";
import sendEmail from "../../../server-utils/emailTemplates/sendEmail.js";

const keysObject = getSecretKeys();
const contactUsHandlerWebsiteRouter = express.Router();

contactUsHandlerWebsiteRouter.post("/", async (req, res) => {
  const bodyRequest = await req.body;

  const { error } = contactUsReqVal(bodyRequest);

  if (error) return res.json({ joiError: error.details[0].message });

  const { customerEmail, message, customerName } = bodyRequest;

  try {
    const subject = "Question Received";
    const folderDir = `${emailTemplateFolderSrc}/contact-us-hbs/to-client`;

    const customerParams = {
      subject: subject,
      folderDir: folderDir,
      customerEmail,
    };

    const emailContextParamsNow = {
      message,
      customerName,
    };

    const result = await sendEmail(customerParams, emailContextParamsNow);

    //params for customer service email, where the email will be read.
    const supportSubject = "New WFR Contact Us Message";
    const supportEmail = keysObject.supportEmail;
    const supportFolderDir = `${emailTemplateFolderSrc}/contact-us-hbs/to-support`;

    const supportAccountParams = {
      subject: supportSubject,
      folderDir: supportFolderDir,
      customerEmail: supportEmail,
    };

    const secondResult = await sendEmail(
      supportAccountParams,
      emailContextParamsNow
    );

    if (result || secondResult)
      return res.json({
        emailSent: true,
      });

    return res.json({
      emailNotSentError: true,
    });
  } catch (error) {
    console.log("error,", error);

    return res.json({ error: "Internal server error" });
  }
});

export default contactUsHandlerWebsiteRouter;
