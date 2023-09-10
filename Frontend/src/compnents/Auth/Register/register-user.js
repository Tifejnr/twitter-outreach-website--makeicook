import axios from "axios";
import { websiteUrl } from "../../../JS functions/websiteUrl";

export default async function registerUser(regParams) {
  const registerUserEndPoint = `${websiteUrl}/api/register-user`;
  try {
    const response = await axios.post(registerUserEndPoint, regParams);
    const data = await response.data;
    if (!data.registered) return false;
    return data;
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data.alreadyRegistered;
    const errorMessageNoJWT = error.response.data.nullJWT;
    if (errorMessageNoJWT) return { errorMessageNoJWT };
    if (errorMessage) return { errorMessage };
    return false;
  }
}
