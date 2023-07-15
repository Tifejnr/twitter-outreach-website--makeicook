import axios from "axios";
import { websiteUrl } from "../websiteUrl";
import displayErrorMessage from "../inputs-validations/error-text-style";

export default async function signInUser(signInParams) {
  const signInEndPoint = `${websiteUrl}/api/sign-in`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signInParams),
  };
  try {
    const response = await fetch(signInEndPoint, options);
    const data = await response.data;
    if (!data.signedIn) return false;
    return true;
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data.invalidLoginDetails;
    displayErrorMessage(errorMessage);
    return false;
  }
}
