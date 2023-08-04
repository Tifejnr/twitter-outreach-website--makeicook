import axios from "axios";
import { websiteUrl } from "../../../JS functions/websiteUrl";

export default async function registerUser(regParams) {
  const registerUserEndPoint = `${websiteUrl}/api/register-user`;
  try {
    const response = await axios.post(registerUserEndPoint, regParams);
    const data = await response.data;
    if (!data.registered) return false;
    return true;
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data.alreadyRegistered;
    if (errorMessage) return errorMessage;
    return false;
  }
}
