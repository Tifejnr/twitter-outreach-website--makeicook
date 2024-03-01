import Cookies from "js-cookie";
import compConstValues from "../../comp-constant-values/compConstValues";

export default function getUserIdCookie() {
  const cookieValue = Cookies.get(compConstValues.userIdCookieName);
  return cookieValue;
}
