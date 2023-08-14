import axios from "axios";
import { websiteUrl } from "../websiteUrl";

export default async function signInUser(signInParams) {
  const signInEndPoint = `${websiteUrl}/api/sign-in`;
  try {
    const response = await axios.post(signInEndPoint, signInParams);
    const data = await response.data;
    if (!data.signedIn) return false;
    return true;
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    const errorMessage = error.response.data.invalidLoginDetails;
    // displayErrorMessage(errorMessage);
    return false;
  }
}
