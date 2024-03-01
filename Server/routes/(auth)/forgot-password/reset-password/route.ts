import { NextRequest, NextResponse } from "next/server";
import user from "@/app/server-utils/database/usersDb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getSecretKeys } from "@/app/envVariables/envVariables";
import resetPasswordValidation from "@/app/server-utils/joi-validations/forgot-password-req/resetPasswordValidation";
import getMongoKeyAndConnect from "@/app/server-utils/database/mongoDbConnect";

getMongoKeyAndConnect();
const keysObject = getSecretKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

export async function POST(req: NextRequest) {
  const bodyRequest = await req.json();

  const { paramsToResetPassword } = bodyRequest;

  const { error } = resetPasswordValidation(paramsToResetPassword);

  if (error) return Response.json({ joiError: error.details[0].message });

  const { userId, forgotPassToken, password } = paramsToResetPassword;

  try {
    const accountUser = await user.findOne({ _id: userId });
    if (!accountUser) return Response.json({ UsernotFound: true });

    const secret = JWT_PRIVATE_KEY + accountUser.password;
    const decodedPayload = jwt.verify(forgotPassToken, secret);

    if (!decodedPayload)
      return Response.json({ invalidToken: "token invalid" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    accountUser.set({
      password: hashedPassword,
    });

    const passwordUpdated = await accountUser.save();

    if (passwordUpdated) return Response.json({ passwordUpdated: true });
  } catch (error) {
    console.log("error,", error);

    return Response.json({ error });
  }
}
