import { NextRequest, NextResponse } from "next/server";
import nodemailer, { SentMessageInfo } from "nodemailer";
import isTokenValid from "../../../middlewares/jwt-related/isTokenValid";
import user from "@/app/server-utils/database/usersDb";
import { getSecretKeys } from "@/app/envVariables/envVariables";
import validateExtensionRequest from "@/app/server-utils/joi-validations/cutsomer-requests-val/from-extension/validateExtensionRequest";

const keysObject = getSecretKeys();

export async function POST(req: NextRequest) {
  const bodyRequest = await req.json();

  const resultOfTokenValidation = await isTokenValid(bodyRequest);

  if (resultOfTokenValidation.nullJWTToken)
    return Response.json({ nullJWTToken: true });

  if (resultOfTokenValidation.invalidToken)
    return Response.json({ invalidToken: true });

  const decodedPayload = resultOfTokenValidation.decodedPayload;

  if (!decodedPayload) return Response.json({ decodedPayloadError: true });

  const { description, requestHeader } = bodyRequest;

  const emailUsername = keysObject.emailUsername;
  const emailPassword = keysObject.emailPassword;
  const supportEmail = keysObject.supportEmail;

  try {
    const { error } = validateExtensionRequest(bodyRequest);
    if (error)
      return Response.json({ extensionRequestError: error.details[0].message });

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

    return Response.json({ emailSent: true }); // Sending emailSent response here
  } catch (error) {
    console.log("error,", error);
    return Response.json({ error: "Internal server error" });
  }
}

async function sendConfirmationToUser(
  transporter: nodemailer.Transporter,
  emailUsername: string,
  accountUser: any,
  requestHeader: string
) {
  const emailToUser = {
    from: emailUsername,
    to: accountUser.email,
    subject: `Request Received`,
    text: `Hi, ${
      accountUser.name
    }, Your Request "${requestHeader.trim()}", has been Received and will be Processed.`,
  };

  await transporter.sendMail(emailToUser);
}
