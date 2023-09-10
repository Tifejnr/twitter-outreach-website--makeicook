import axios from "axios";
import { websiteUrl } from "../websiteUrl";

export default async function isUserLoggedIn() {
  const isUserLoggedInEndpoint = `${websiteUrl}/isloggedIn`;
  try {
    const response = await axios.post(isUserLoggedInEndpoint);
    const data = await response.data;

    if (!data.loggedIn) return false;
    return true;
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data.unAuthorizedToken;
    return false;
  }
}
