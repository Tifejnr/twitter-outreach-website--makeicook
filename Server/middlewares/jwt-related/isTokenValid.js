import jwt from "jsonwebtoken";
import user from "../../server-utils/database/usersDb";
import getSecretKeys from "../../envVariables/envVariables";

export default async function isTokenValid(bodyRequest) {
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
    const decodedPayload = jwt.verify(token, JWT_PRIVATE_KEY);

    if (!decodedPayload) return { invalidToken: true };

    if (isJssHomePage) {
      const accountUser = await user.findById(decodedPayload._id);

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
