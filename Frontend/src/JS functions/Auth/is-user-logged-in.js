import axios from "axios";
import getCookie from "./cookie-handling/get-cookie";
const isUserLoggedInEndpoint = "http://localhost:3000/isloggedIn";

export default async function isUserLoggedIn() {
  // const jwtToken = getCookie();
  try {
    const response = await axios.post(isUserLoggedInEndpoint);
    const data = await response.data;
    console.log(data);
    if (!data.loggedIn) return false;
    return true;
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data.unAuthorizedToken;
    return false;
  }
}
