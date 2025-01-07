import axios from "axios";
import getCookies from "../../utilis/cookiesSetting/getCookies";
import allLinks from "../../auth/utils/links/allLinks";

export default async function getCheckoutLink(planPrice) {
  const token = getCookies();

  const paramToServer = {
    planPrice: planPrice,
    token,
    fromExtension: true,
  };

  try {
    const response = await axios.post(
      allLinks.pricingCheckoutServerRoute,
      paramToServer
    );

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
