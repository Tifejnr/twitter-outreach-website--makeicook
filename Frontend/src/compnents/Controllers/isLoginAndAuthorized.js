import axios from "axios";
import { websiteUrl } from "../websiteUrl";

export default async function isLoginAndAuthorized() {
  const isUserAuthorized = `${websiteUrl}/isloggedIn`;
  try {
    const response = await axios.post(isUserAuthorized);
    const data = await response.data;

    if (data.authorized) return data;

    if (data.loggedIn) return data;

    return false;
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data.unAuthorizedToken;
    return false;
  }
}
