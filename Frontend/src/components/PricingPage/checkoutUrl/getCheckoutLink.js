import axios from "axios";
import allLinks from "../../auth/utils/links/allLinks";
import getCookies from "../../component-utils/cookiesSetting/getCookies";

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

    if (response.data.unauthorizedToken) return response;
    const checkoutUrl = response.data.paymentLink;

    if (checkoutUrl) return { checkoutUrl };
    // const data = await response.data;
  } catch (error) {
    console.log("checkout error", error);
    const errorDetail = error.response.data;
    if (errorDetail) return errorDetail;

    return false;
  }
}
