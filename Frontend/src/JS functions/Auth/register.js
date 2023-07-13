import axios from "axios";
import displayErrorMessage from "../inputs-validations/error-text-style";
const registerUserEndPoint =
  "https://www.collabfortrello.com/api/register-user";

export default async function registerUser(regParams) {
  try {
    const response = await axios.post(registerUserEndPoint, regParams);
    const data = await response.data;
    if (!data.registered) return false;
    return true;
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data.alreadyRegistered;
    displayErrorMessage(errorMessage);
    return false;
  }
}
