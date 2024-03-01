import axios from "axios";

import allLinks from "../utils/links/allLinks";

export default async function signUpUserRequest(signUpParams) {
  const signInEndPoint = allLinks.apiRouteSignUp;
  try {
    const response = await axios.post(signInEndPoint, signUpParams);

    const data = await response.data;

    if (data.joiError) return { joiError: data.joiError };
    if (data.invalidCode) return { invalidCode: data.invalidCode };
    if (data.alreadyRegistered)
      return { alreadyRegistered: data.alreadyRegistered };

    if (data.token) return { token: data.token };

    return data;
  } catch (error) {
    console.log("error", error);

    return { error };
  }
}
