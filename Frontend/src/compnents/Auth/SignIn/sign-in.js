import axios from "axios";
import { websiteUrl } from "../../../JS functions/websiteUrl";

export default async function signInUser(signInParams) {
  const signInEndPoint = `${websiteUrl}/api/sign-in`;
  try {
    const response = await axios.post(signInEndPoint, signInParams);
    const data = await response.data;
    if (!data.signedIn) return false;
    return true;
  } catch (error) {
    // console.log(error.response.data);
    const errorMessage = error.response.data.invalidLoginDetails;
    const errorMessageNoJWT = error.response.data.nullJWT;
    if (errorMessageNoJWT) return { errorMessageNoJWT };
    if (errorMessage) return { errorMessage };
    return false;
  }
}
