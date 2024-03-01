import axios, { AxiosError } from "axios";
import allLinks from "../utils/links/allLinks";
import type { ParamsObjTypes } from "../Auth-Input-Validation/validateAll";

interface ErrorResponse {
  invalidLoginDetails?: string;
  nullJWT?: string;
  joiError?: string;
}

type LoginServerResponse = {
  joiError?: string;
  token?: string;
  errorMessage?: string;
  error?: any;
};

export default async function loginUserRequest(
  signInParams: ParamsObjTypes
): Promise<LoginServerResponse> {
  const signInEndPoint = allLinks.apiRouteSignIn;
  try {
    const response = await axios.post(signInEndPoint, signInParams);
    const data = await response.data;

    if (data.invalidLoginDetails)
      return { errorMessage: data.invalidLoginDetails };
    if (data.joiError) return { errorMessage: data.joiError };

    if (data.token) return { token: data.token };

    return data;
  } catch (error: any) {
    console.log("error", error);
    const errorResponse: ErrorResponse = error.response?.data || {};

    if (errorResponse.invalidLoginDetails)
      return { errorMessage: errorResponse.invalidLoginDetails };
    if (errorResponse.joiError) return { errorMessage: errorResponse.joiError };
    return { error };
  }
}
