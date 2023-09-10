import Cookies from "js-cookie";

const cookieExpiryDate = {
  expires: 30,
};

export default function setCookies(cookieValue) {
  Cookies.set("cftAuth", cookieValue, cookieExpiryDate);
}
