import { NextRequest } from "next/server";
import contactUsReqVal from "@/app/server-utils/joi-validations/cutsomer-requests-val/from-website/contactUsReqVal";
import sendEmail from "@/app/server-utils/emailTemplates/sendEmail";
import { getSecretKeys } from "@/app/envVariables/envVariables";
import getMongoKeyAndConnect from "@/app/server-utils/database/mongoDbConnect";
import emailTemplateFolderSrc from "@/app/server-utils/emailTemplates/template-folder-src/emailTemplateFolderSrc";

getMongoKeyAndConnect();

const keysObject = getSecretKeys();

export async function POST(req: NextRequest) {
  const bodyRequest = await req.json();

  const { error } = contactUsReqVal(bodyRequest);

  if (error) return Response.json({ joiError: error.details[0].message });

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

    if (result && secondResult)
      return Response.json({
        emailSent: true,
      });

    return Response.json({
      emailNotSentError: true,
    });
  } catch (error) {
    console.log("error,", error);

    return Response.json({ error: "Internal server error" });
  }
}
