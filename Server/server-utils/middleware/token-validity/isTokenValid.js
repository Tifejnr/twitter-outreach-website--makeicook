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

    //if request is to get client name from wfr extension
    if (prompt) {
      const accountUser = await user.findById(decodedPayload._id);

      if (!accountUser) return { invalidToken: true };

      accountUser.jobsToBeCompleted++;

      await accountUser.save();

      console.log(
        fromExtension,
        "usage time",
        accountUser.jobsToBeCompleted,
        accountUser.email
        // currentUrl
      );

      // return { decodedPayload, credits };
    }

    return { decodedPayload, credits };
  } catch (ex) {
    return { invalidToken: true };
  }
}
