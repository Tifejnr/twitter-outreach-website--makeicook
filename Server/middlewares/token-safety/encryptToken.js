const CryptoJS = require("crypto-js");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const CRYPTO_SECRET_KEY = keysObject.CRYPTO_SECRET_KEY;

async function encryptToken(rawToken) {
  try {
    const encrytptedToken = CryptoJS.AES.encrypt(
      rawToken,
      CRYPTO_SECRET_KEY
    ).toString();

    return encrytptedToken;
  } catch (error) {
    console.log(error);
    return false;
  }
}

exports.encryptToken = encryptToken;
