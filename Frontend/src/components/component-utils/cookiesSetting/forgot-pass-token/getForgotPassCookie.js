import Cookies from "js-cookie";

import compConstValues from "../../comp-constant-values/compConstValues";

export default function getForgotPassCookie() {
  const cookieValue = Cookies.get(compConstValues.forgotPassCookieName);
  return cookieValue;
}
