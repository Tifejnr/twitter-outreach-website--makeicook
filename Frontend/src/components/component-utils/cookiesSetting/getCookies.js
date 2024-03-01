import Cookies from "js-cookie";

import compConstValues from "../comp-constant-values/compConstValues";

export default function getCookies() {
  const cookieValue = Cookies.get(compConstValues.cookieName);
  return cookieValue;
}
