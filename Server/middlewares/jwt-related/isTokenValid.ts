import { getSecretKeys } from "@/app/envVariables/envVariables";
import jwt from "jsonwebtoken";
import user from "@/app/server-utils/database/usersDb";
import getMongoKeyAndConnect from "@/app/server-utils/database/mongoDbConnect";
import type { AccountUserModel } from "@/app/server-utils/database/usersDb";

interface JwtPayloadType {
  _id: string;
  isPaid: boolean;
}

//connect to mongo deb
getMongoKeyAndConnect();

export default async function isTokenValid(bodyRequest: any): Promise<{
  nullJWTToken?: boolean;
  invalidToken?: boolean;
  notAuthorizedOnJSSHomePage?: boolean;
  authorizedOnJSSHomePage?: boolean;
  decodedPayload?: any;
}> {
  //get request sent
  const keysObject = getSecretKeys();
  const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

  const { fromExtension, isJssHomePage } = bodyRequest;

  let token;

  //fetch token from cookies on server first
  //   token = req.cookies.xAuth;
  token = bodyRequest.token;

  if (fromExtension) {
    //extension means of checking if token is sent in request body
    token = bodyRequest.token;

    if (!token) return { nullJWTToken: true };
  }

  if (!token) return { nullJWTToken: true };

  try {
    const decodedPayload = jwt.verify(token, JWT_PRIVATE_KEY) as JwtPayloadType;

    if (!decodedPayload) return { invalidToken: true };

    if (isJssHomePage) {
      const accountUser = (await user.findById(
        decodedPayload._id
      )) as AccountUserModel | null;

      if (!accountUser) return { invalidToken: true };

      if (accountUser.jobsCompleted && accountUser.jobsCompleted < 10) {
        return { notAuthorizedOnJSSHomePage: true };
      }

      return { authorizedOnJSSHomePage: true };
    }

    return { decodedPayload: JSON.stringify(decodedPayload) };
  } catch (ex) {
    return { invalidToken: true };
  }
}
