import axios from "axios";
import allLinks from "../../../auth/utils/links/allLinks";

export default async function getAllTutorialsObjArrayFromServer() {
  try {
    const response = await axios.post(
      allLinks.tutorialsObjArrayFromServerRoute
    );
    const data = await response.data;

    if (!data.allVideoTutorialsArray) return false;
    return data;
  } catch (error) {
    console.log(error.response);
    const errorMessage = error.response.data.invalidLoginDetails;
    const errorMessageNoJWT = error.response.data.nullJWT;
    const joiErrorMessage = error.response.data.joiError;
    if (errorMessageNoJWT) return { errorMessageNoJWT };
    if (errorMessage) return { errorMessage };
    if (joiErrorMessage) return { joiErrorMessage };
    return false;
  }
}
