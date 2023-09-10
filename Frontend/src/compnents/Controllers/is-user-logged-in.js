import axios from "axios";
import { websiteUrl } from "../../JS functions/websiteUrl";
import getCookies from "../utilis/cookiesSetting/getCookies";

export default async function isUserLoggedIn() {
  const isUserLoggedInEndpoint = `${websiteUrl}/isloggedIn`;
  const token = getCookies();
  try {
    const response = await axios.post(isUserLoggedInEndpoint, { token });
    const data = await response.data;

    if (!data.loggedIn) return false;
    return true;
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data.unAuthorizedToken;
    return false;
  }
}
