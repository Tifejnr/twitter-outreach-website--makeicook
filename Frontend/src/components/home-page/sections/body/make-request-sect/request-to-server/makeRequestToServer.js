import axios from "axios";
import requestConstantValues from "../constant-values/requestConstantValues";

type RequestToServerParamTypes = {
  textAreaText: string;
  headingText: string;
};

type RequestToServerResultType = {
  emailSent?: boolean;
  error?: any;
};

export default async function makeRequestToServer(
  params: RequestToServerParamTypes
): Promise<RequestToServerResultType> {
  const { textAreaText, headingText } = params;

  const paramsToServer = {
    message: textAreaText,
    requestHeader: headingText,
  };

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const makeRequestEndpoint = `${requestConstantValues.websiteUrl}/api/requests-made`;

    console.log(makeRequestEndpoint);
    const response = await axios.post(
      makeRequestEndpoint,
      paramsToServer,
      axiosConfig
    );
    const data = await response.data;

    if (data.emailSent) {
      return { emailSent: true };
    } else {
      // In case emailSent is not true
      return { emailSent: false };
    }
  } catch (error: any) {
    console.error("Error making request to server:", error);

    return { error };
    // Handle error here, e.g., show error message to the user
  }
}