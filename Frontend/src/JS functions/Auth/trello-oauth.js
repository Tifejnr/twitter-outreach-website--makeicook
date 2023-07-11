import axios from "axios";
import getCookie from "./cookie-handling/get-cookie";
const trelloAuthEndpoint = "http://localhost:3000/authorize";

export default async function trelloAuthRedirect() {
  const jwtToken = await getCookie();
  try {
    const response = await axios.post(trelloAuthEndpoint, { jwtToken });
    const data = await response.data;

    if (!data.authorizationUrl) return false;

    return (window.location.href = data.authorizationUrl);
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data;
    console.log(errorMessage);
    return false;
  }
}
