import Cookies from "js-cookie";
import compConstValues from "../../comp-constant-values/compConstValues";

const cookieExpiryDate = {
  expires: 30,
};

export default function setForgotPassCookie(cookieValue) {
  Cookies.set(
    compConstValues.forgotPassCookieName,
    cookieValue,
    cookieExpiryDate
  );
}
