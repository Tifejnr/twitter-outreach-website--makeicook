import axios from "axios";
import { websiteUrl } from "../../JS functions/websiteUrl";
import getCookies from "../utilis/cookiesSetting/getCookies";

export default async function trelloAuthRedirect() {
  const trelloAuthEndpoint = `${websiteUrl}/authorize`;
  const token = getCookies();
  try {
    const response = await axios.post(trelloAuthEndpoint, { token });
    const data = await response.data;

    if (!data.authorizationUrl) return false;

    return (window.location.href = data.authorizationUrl);
  } catch (error) {
    const errorMessage = error.response.data;
    console.log(errorMessage);
    return false;
  }
}
