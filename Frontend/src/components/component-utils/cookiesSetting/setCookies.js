import Cookies from "js-cookie";
import compConstValues from "../comp-constant-values/compConstValues";

const cookieExpiryDate = {
  expires: 30,
};

export default function setCookies(cookieValue: string) {
  Cookies.set(compConstValues.cookieName, cookieValue, cookieExpiryDate);
}
