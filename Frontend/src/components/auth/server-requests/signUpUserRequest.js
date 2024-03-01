import axios from "axios";

import allLinks from "../utils/links/allLinks";

import type { ParamsObjTypes } from "../Auth-Input-Validation/validateAll";

type ServerSignUpType = {
  alreadyRegsitered?: string;
  invalidCode?: string;
  token?: string;
  alreadyRegistered?: string;
  joiError?: string;
  error?: any;
};

export default async function signUpUserRequest(
  signUpParams: ParamsObjTypes
): Promise<ServerSignUpType> {
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
  } catch (error: any) {
    console.log("error", error);

    return { error };
  }
}
