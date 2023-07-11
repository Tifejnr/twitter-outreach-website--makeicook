const CryptoJS = require("crypto-js");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const CRYPTO_SECRET_KEY = keysObject.CRYPTO_SECRET_KEY;

async function decryptToken(encryptedToken) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, CRYPTO_SECRET_KEY);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    console.log(decryptedToken); // 'my message'

    return decryptedToken;
  } catch (error) {
    console.log(error);
    return false;
  }
}

exports.decryptToken = decryptToken;
