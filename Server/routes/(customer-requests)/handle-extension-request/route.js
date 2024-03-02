import express from "express";
import user from "../../../server-utils/database/usersDb.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import getSecretKeys from "../../../envVariables/envVariables.js";
import validateExtensionRequest from "../../../server-utils/joi-validations/cutsomer-requests-val/from-extension/validateExtensionRequest.js";
import sendEmail from "../../../server-utils/emailTemplates/sendEmail.js";

const keysObject = getSecretKeys();

const handlerExtensionRequestRouter = express.Router();

handlerExtensionRequestRouter.post("/", async (req, res) => {
  const bodyRequest = await req.body;

  const resultOfTokenValidation = await isTokenValid(bodyRequest);

  if (resultOfTokenValidation.nullJWTToken)
    return res.json({ nullJWTToken: true });

  if (resultOfTokenValidation.invalidToken)
    return res.json({ invalidToken: true });

  const decodedPayload = resultOfTokenValidation.decodedPayload;

  if (!decodedPayload) return res.json({ decodedPayloadError: true });

  const { description, requestHeader } = bodyRequest;

  const { supportEmail } = keysObject;

  const { error } = validateExtensionRequest(bodyRequest);
  if (error)
    return res.json({ extensionRequestError: error.details[0].message });

  try {
    const accountUser = await user.findById(decodedPayload._id);

    const subject = "Request Received";
    const folderDir = `${emailTemplateFolderSrc}/contact-us-from-extension/to-client`;

    const customerParams = {
      subject: subject,
      folderDir: folderDir,
      customerEmail: accountUser.email,
    };

    const emailContextParamsNow = {
      description,
      requestHeader,
      customerName: accountUser.name,
    };

    const result = await sendEmail(customerParams, emailContextParamsNow);

    //params for customer service email, where the email will be read.
    const supportSubject = "From Extension - New WFR Contact Us Message";
    const supportFolderDir = `${emailTemplateFolderSrc}/contact-us-from-extension/to-support`;

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

export default handlerExtensionRequestRouter;
