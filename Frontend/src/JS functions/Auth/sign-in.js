import axios from "axios";
import displayErrorMessage from "../inputs-validations/error-text-style";
import setCookie from "./cookie-handling/set-cookie";
const signInEndPoint = "https://www.collabfortrello.com/api/sign-in";

const axiosConfig = {
  withCredentials: true,
};

export default async function signInUser(signInParams) {
  try {
    const response = await axios.post(signInEndPoint, signInParams);
    const data = await response.data;
    if (!data.signedIn) return false;
    const jwtToken = data.jwtToken;
    await setCookie(jwtToken);
    return true;
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data.invalidLoginDetails;
    displayErrorMessage(errorMessage);
    return false;
  }
}
