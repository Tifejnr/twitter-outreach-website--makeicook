import axios from "axios";
import { websiteUrl } from "../../../JS functions/websiteUrl";
import getCookies from "../../utilis/cookiesSetting/getCookies";

export default async function getCheckoutLink(planName) {
  const token = getCookies();
  const paramToServer = {
    planName: planName.trim(),
    token,
  };
  const isUserLoggedInEndpoint = `${websiteUrl}/api/checkout`;
  try {
    const response = await axios.post(isUserLoggedInEndpoint, paramToServer);

    if (response.unauthorizedToken) return response;
    const checkoutUrl = response.data.checkoutUrl;

    if (checkoutUrl) return { checkoutUrl };
    // const data = await response.data;
  } catch (error) {
    console.log("checkout error", error);
    const errorDetail = error.response.data;
    if (errorDetail) return errorDetail;

    return false;
  }
}
