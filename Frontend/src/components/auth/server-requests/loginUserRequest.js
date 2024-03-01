import axios from "axios";
import allLinks from "../utils/links/allLinks";

export default async function loginUserRequest(signInParams) {
  const signInEndPoint = allLinks.apiRouteSignIn;
  try {
    const response = await axios.post(signInEndPoint, signInParams);
    const data = await response.data;

    if (data.invalidLoginDetails)
      return { errorMessage: data.invalidLoginDetails };
    if (data.joiError) return { errorMessage: data.joiError };

    if (data.token) return { token: data.token };

    return data;
  } catch (error) {
    console.log("error", error);
    const errorResponse = error.response?.data;

    if (errorResponse.invalidLoginDetails)
      return { errorMessage: errorResponse.invalidLoginDetails };
    if (errorResponse.joiError) return { errorMessage: errorResponse.joiError };
    return { error };
  }
}
