import axios from "axios";
import { websiteUrl } from "../websiteUrl";

export default async function trelloAuthRedirect() {
  const trelloAuthEndpoint = `${websiteUrl}/authorize`;
  try {
    const response = await axios.post(trelloAuthEndpoint);
    const data = await response.data;

    if (!data.authorizationUrl) return false;

    return (window.location.href = data.authorizationUrl);
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data;
    console.log(errorMessage);
    return false;
  }
}
