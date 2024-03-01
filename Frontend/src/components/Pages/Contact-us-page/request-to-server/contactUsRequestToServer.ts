import axios, { AxiosError } from "axios";
import allLinks from "@/app/components/auth/utils/links/allLinks";

interface ContactUserRequestParamTypes {
  customerEmail: string;
  message: string;
  customerName: string;
}

interface ServerResponse {
  error?: any;
  joiError?: string;
  emailSent?: boolean;
  somethingElseHappened?: boolean;
}

export default async function contactUsRequestToServer(
  contactUsParams: ContactUserRequestParamTypes
): Promise<ServerResponse> {
  const signInEndPoint = allLinks.contactUsAPIRoute;
  try {
    const response = await axios.post(signInEndPoint, contactUsParams);
    const data = await response.data;

    console.log("response", response);

    if (data.joiError) return { joiError: data.joiError };

    if (data.emailSent) return { emailSent: true };

    return { somethingElseHappened: true };
  } catch (error: any) {
    console.log(error.response);
    // const errorResponse: ErrorResponse = error.response?.data || {};

    // if (errorResponse.nullJWT) return { errorMessage: errorResponse.nullJWT };
    // if (errorResponse.invalidLoginDetails)
    //   return { errorMessage: errorResponse.invalidLoginDetails };
    // if (errorResponse.joiError) return { errorMessage: errorResponse.joiError };
    return { error };
  }
}
