import axios from "axios";
const trelloAuthEndpoint = "http://localhost:3000/authorize";

export default async function trelloAuthRedirect() {
  try {
    const response = await axios.post(trelloAuthEndpoint);
    const data = await response.data;
    console.log(data);
    if (!data.authorizationUrl) return false;
    console.log(data.authorizationUrl);
    return (window.location.href = data.authorizationUrl);
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data;
    console.log(errorMessage);
    return false;
  }
}
