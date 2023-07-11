import Cookies from "js-cookie";

export default async function getCookie() {
  try {
    const jwtToken = Cookies.get("cftAuth");
    if (!jwtToken) return "";

    return jwtToken;
  } catch (error) {
    console.log(error);
    return false;
  }
}
