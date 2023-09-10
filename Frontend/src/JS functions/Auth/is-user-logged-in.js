import axios from "axios";
import { websiteUrl } from "../websiteUrl";
import getCookies from "../../compnents/utilis/cookiesSetting/getCookies";

export default async function isUserLoggedIn() {
  const token = getCookies();
  if (!token) return false;

  const isUserLoggedInEndpoint = `${websiteUrl}/isloggedIn`;
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
