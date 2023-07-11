import Cookies from "js-cookie";

export default async function setCookie(jwtToken) {
  try {
    // Set the cookie
    Cookies.set("cftAuth", jwtToken, { expires: 30 });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
