import axios from "axios";
import allLinks from "../auth/utils/links/allLinks";

export default async function getAllPlansFromServer() {
  try {
    const response = await axios.post(allLinks.pricingPlansGettingServerRoute);
    const data = await response.data;

    if (data.invalidLoginDetails)
      return { errorMessage: data.invalidLoginDetails };
    if (data.joiError) return { errorMessage: data.joiError };

    if (data.allPricingPlansObj) return data;

    return [];
  } catch (error) {
    console.log("error", error);
    const errorResponse = error.response?.data;

    if (errorResponse.invalidLoginDetails)
      return { errorMessage: errorResponse.invalidLoginDetails };
    if (errorResponse.joiError) return { errorMessage: errorResponse.joiError };
    return { error };
  }
}
