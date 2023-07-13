import Cookies from "js-cookie";

export default function getCookie() {
  try {
    const removeCookie = () => {
      Cookies.remove("yourCookieName");
    };

    return jwtToken;
  } catch (error) {
    console.log(error);
    return false;
  }
}
