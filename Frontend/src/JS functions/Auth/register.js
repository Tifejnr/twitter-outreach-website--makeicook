import axios from "axios";
import setCookie from "./cookie-handling/set-cookie";
import displayErrorMessage from "../inputs-validations/error-text-style";
const registerUserEndPoint = "http://localhost:3000/api/register-user";

export default async function registerUser(regParams) {
  try {
    const response = await axios.post(registerUserEndPoint, regParams);
    const data = await response.data;
    if (!data.registered) return false;
    const jwtToken = data.jwtToken;
    await setCookie(jwtToken);
    return true;
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data.alreadyRegistered;
    displayErrorMessage(errorMessage);
    return false;
  }
}
