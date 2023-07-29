import axios from "axios";
import { websiteUrl } from "../../JS functions/websiteUrl";

export default async function isLoginAndAuthorized() {
  const isUserAuthorized = `${websiteUrl}/is-account-authorized`;
  try {
    const response = await axios.post(isUserAuthorized);
    const data = await response.data;

    console.log(data);

    if (data.authorized) return data;

    if (data.loggedIn) return data;

    if (data.backToOauthPage) return data;

    return false;
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data.unAuthorizedToken;
    return false;
  }
}
