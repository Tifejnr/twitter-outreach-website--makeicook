import axios from "axios";
import { websiteUrl } from "../../../JS functions/websiteUrl";

export default async function getCheckoutLink(planName) {
  const paramToServer = {
    planName: planName.trim(),
  };
  const isUserLoggedInEndpoint = `${websiteUrl}/api/checkout`;
  try {
    const response = await axios.post(isUserLoggedInEndpoint, paramToServer);

    if (response.unauthorizedToken) return response;
    const checkoutUrl = response.data.checkoutUrl;
    if (checkoutUrl) return checkoutUrl;
    // const data = await response.data;
  } catch (error) {
    const errorDetail = error.response.data;
    if (errorDetail) return errorDetail;

    return false;
  }
}
