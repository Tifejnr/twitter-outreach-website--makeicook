const CryptoJS = require("crypto-js");
// Decrypt

export default function decryptToken() {
  const bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
  const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

  console.log(decryptedToken); // 'my message'

  return decryptedToken;
}
