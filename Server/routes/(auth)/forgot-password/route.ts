import { NextRequest } from "next/server";
import user from "@/app/server-utils/database/usersDb";
import forgotPasswordValidation from "@/app/server-utils/joi-validations/forgot-password-req/forgotPasswordValidation";
import jwt from "jsonwebtoken";
import { getSecretKeys } from "@/app/envVariables/envVariables";
import sendEmail from "@/app/server-utils/emailTemplates/sendEmail";
import getMongoKeyAndConnect from "@/app/server-utils/database/mongoDbConnect";
import emailTemplateFolderSrc from "@/app/server-utils/emailTemplates/template-folder-src/emailTemplateFolderSrc";

getMongoKeyAndConnect();

const keysObject = getSecretKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

const websiteUrl = "http://localhost:3000";
// const websiteUrl = "https://workforreputation.com";

export async function POST(req: NextRequest) {
  const bodyRequest = await req.json();

  const { error } = forgotPasswordValidation(bodyRequest);

  if (error) return Response.json({ emailError: error.details[0].message });

  try {
    const accountUser = await user.findOne({ email: bodyRequest.email });
    if (!accountUser) return Response.json({ notFoundUser: "User not found" });

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
      return Response.json({
        emailSent: true,
        userId: accountUser.id,
        forgotPassToken: token,
      });

    return Response.json({
      emailNotSentError: true,
    });
  } catch (error) {
    console.log("error,", error);

    return Response.json({ error: "Internal server error" });
  }
}
