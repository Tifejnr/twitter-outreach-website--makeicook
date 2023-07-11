const CryptoJS = require("crypto-js");
// Encrypt

export default function encryptToken() {
  const encrytptedText = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "secret key 123"
  ).toString();

  return encrytptedText;
}
