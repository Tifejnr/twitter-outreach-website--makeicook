import express from "express";
import user from "../../../server-utils/database/usersDb";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid";
import getSecretKeys from "../../../envVariables/envVariables";
import validateExtensionRequest from "../../../server-utils/joi-validations/cutsomer-requests-val/from-extension/validateExtensionRequest";

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

  const { emailUsername, emailPassword, supportEmail } = keysObject;

  try {
    const { error } = validateExtensionRequest(bodyRequest);
    if (error)
      return res.json({ extensionRequestError: error.details[0].message });

    const accountUser = await user.findById(decodedPayload._id);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUsername,
        pass: emailPassword,
      },
    });

    const requestSentToSupport = {
      from: emailUsername,
      to: supportEmail,
      subject: `${requestHeader} from ${accountUser.name}`,
      text: `${accountUser.name} Request,
    ${description.trim()}`,
    };

    const result = await transporter.sendMail(requestSentToSupport);

    await sendConfirmationToUser(
      transporter,
      emailUsername,
      accountUser,
      requestHeader
    );

    return res.json({ emailSent: true }); // Sending emailSent res here
  } catch (error) {
    console.log("error,", error);
    return res.json({ error: "Internal server error" });
  }

  try {
    const subject = "Request Received";
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
