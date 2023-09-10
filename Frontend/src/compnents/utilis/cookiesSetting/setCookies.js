import Cookies from "js-cookie";

const cookieExpiryDate = {
  expires: 30,
};

const cookieName = "cftAuth";

export default function setCookies(cookieValue) {
  Cookies.set(cookieName, cookieValue, cookieExpiryDate);
}
