import Cookies from "js-cookie";

const cookieName = "cftAuth";

export default function getCookies() {
  const cookieValue = Cookies.get(cookieName);
  return cookieValue;
}
