import jwt from "jsonwebtoken";
import userMakeICook from "../../../../server-utils/database/make-i-cook/makeICookUserDb.js";
import getSecretKeys from "../../../../envVariables/envVariables.js";

export default async function isTokenValidMakeICook(bodyRequest) {
  //get request sent
  const keysObject = getSecretKeys();
  const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY_MIC_OWN;

  const { fromExtension, isJssHomePage, prompt } = bodyRequest;

  let token;

  token = bodyRequest.token;

  if (fromExtension) {
    //extension means of checking if token is sent in request body
    token = bodyRequest.token;

    if (!token) return { nullJWTToken: true };
  }

  if (!token) return { nullJWTToken: true };

  // console.log(" token", token);

  try {
    const decodedPayload = jwt.verify(token, JWT_PRIVATE_KEY);

    if (!decodedPayload) return { invalidToken: true };

    if (isJssHomePage) {
      const accountUser = await userMakeICook.findById(decodedPayload._id);

      if (!accountUser) return { invalidToken: true };

      if (accountUser.jobsCompleted && accountUser.jobsCompleted < 10) {
        return { notAuthorizedOnJSSHomePage: true };
      }

      return { authorizedOnJSSHomePage: true };
    }

    //if request is to get client name from wfr extension
    if (prompt) {
      const accountUser = await userMakeICook.findById(decodedPayload._id);

      if (!accountUser) return { invalidToken: true };

      accountUser.jobsToBeCompleted++;

      const blacklistedEmail = "PAVILIONPEE@GMAIL.COM";
      const blacklistedEmail2 = "Aliomarr3885@gmail.com";

      await accountUser.save();

      if (accountUser.email == blacklistedEmail) {
        return { blacklistedEmail };
      }
      if (accountUser.email == blacklistedEmail2) {
        return { blacklistedEmail: blacklistedEmail2 };
      }

      console.log("accountUser.jobsToBeCompleted", accountUser.email);
    }

    return { decodedPayload };
  } catch (ex) {
    return { invalidTokenmakeicook: true };
  }
}
