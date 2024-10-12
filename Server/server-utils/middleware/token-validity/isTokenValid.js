import jwt from "jsonwebtoken";
import user from "../../database/usersDb.js";
import getSecretKeys from "../../../envVariables/envVariables.js";

export default async function isTokenValid(bodyRequest) {
  //get request sent
  const keysObject = getSecretKeys();
  const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

  const { fromExtension, isJssHomePage, prompt, jobId, currentUrl } =
    bodyRequest;

  let token;

  token = bodyRequest.token;

  if (fromExtension) {
    //extension means of checking if token is sent in request body
    token = bodyRequest.token;

    if (!token) return { nullJWTToken: true };
  }

  if (!token) return { nullJWTToken: true };

  try {
    const decodedPayload = jwt.verify(token, JWT_PRIVATE_KEY);

    if (!decodedPayload) return { invalidToken: true };

    const accountUser = await user.findById(decodedPayload._id);

    const { credits } = accountUser;

    console.log("credits", credits);

    if (isJssHomePage) {
      const accountUser = await user.findById(decodedPayload._id);

      if (!accountUser) return { invalidToken: true };

      if (accountUser.jobsCompleted && accountUser.jobsCompleted < 10) {
        return { notAuthorizedOnJSSHomePage: true };
      }

      return { authorizedOnJSSHomePage: true };
    }

    //if request is to get client name from wfr extension
    if (prompt) {
      const accountUser = await user.findById(decodedPayload._id);

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

      console.log(
        fromExtension,
        "accountUser.jobsToBeCompleted",
        accountUser.jobsToBeCompleted,
        accountUser.email,
        jobId,
        currentUrl
      );

      // return { decodedPayload, credits };
    }

    return { decodedPayload };
  } catch (ex) {
    return { invalidToken: true };
  }
}
