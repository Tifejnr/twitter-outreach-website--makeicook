import { NextRequest, NextResponse } from "next/server";
import { getSecretKeys } from "@/app/envVariables/envVariables";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import _ from "lodash";
import user from "@/app/server-utils/database/usersDb";
import getMongoKeyAndConnect from "@/app/server-utils/database/mongoDbConnect";
import websiteSignUpValidatio from "@/app/server-utils/joi-validations/sign-up/websiteSignUpValidation";
import extensionSignUpValidation from "@/app/server-utils/joi-validations/sign-up/extensionSignUpValidation";
import getFirst3Letters from "@/app/server-utils/users-identifers/getFirst3Letters";

//connect to mongo deb
getMongoKeyAndConnect();

export async function POST(req: NextRequest) {
  //get request sent
  const bodyRequest = await req.json();
  const { fromExtension, password } = bodyRequest;
  const keysObject = getSecretKeys();
  const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;
  const entry_code = keysObject.entry_code;
  const TIFE_ENTRY_CODE = keysObject.TIFE_ENTRY_CODE;

  //if from extension
  if (fromExtension) {
    const { error } = extensionSignUpValidation(bodyRequest);

    if (error) return Response.json({ joiError: error.details[0].message });

    let accountUser = await user.findOne({ email: bodyRequest.email });

    if (accountUser)
      return Response.json({ alreadyRegistered: "User already registered" });

    accountUser = new user(_.pick(bodyRequest, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(11);

    accountUser.password = await bcrypt.hash(accountUser.password, salt);

    accountUser.entryCode = keysObject.extensionEntryCode;

    await accountUser.save();

    const token = jwt.sign(
      { _id: accountUser._id, isPaid: accountUser.isPaid },
      JWT_PRIVATE_KEY
    );

    return Response.json({ token });
  }

  //normal website login
  const { error } = websiteSignUpValidatio(bodyRequest);
  if (error) return Response.json({ emailError: error.details[0].message });

  const entryCode = bodyRequest.entryCode;
  if (!(entryCode == entry_code || entryCode == TIFE_ENTRY_CODE))
    return Response.json({ invalidCode: "Invalid Entry Code" });

  let accountUser = await user.findOne({ email: bodyRequest.email });

  if (accountUser)
    return Response.json({ alreadyRegistered: "User already registered" });

  accountUser = new user(
    _.pick(bodyRequest, ["name", "email", "password", "entryCode"])
  );

  const salt = await bcrypt.genSalt(11);
  accountUser.password = await bcrypt.hash(accountUser.password, salt);
  const isPaidAlready = getFirst3Letters(entryCode);

  if (isPaidAlready == keysObject.threeLetterslamzStudentsIdentifier) {
    accountUser.isPaid = true;
  }

  await accountUser.save();

  const token = jwt.sign(
    { _id: accountUser._id, isPaid: accountUser.isPaid },
    JWT_PRIVATE_KEY
  );

  return Response.json({ token });
}
