import Cookies from "js-cookie";

export default function getCookie() {
  try {
    const jwtToken = Cookies.get("cftAuth");
    if (!jwtToken) return false;

    return jwtToken;
  } catch (error) {
    console.log(error);
    return false;
  }
}
