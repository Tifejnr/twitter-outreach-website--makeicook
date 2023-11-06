const CryptoJS = require("crypto-js");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const CRYPTO_SECRET_KEY = keysObject.CRYPTO_SECRET_KEY;

async function encryptExtensionKey(rawExtensionKey) {
  try {
    const extensionKeyDecrypter = CryptoJS.lib.WordArray.random(16).toString();
    const extensionKey = CryptoJS.AES.encrypt(
      rawExtensionKey,
      CRYPTO_SECRET_KEY,
      {
        extensionKeyDecrypter,
      }
    ).toString();

    const encryptObj = {
      extensionKeyDecrypter,
      extensionKey,
    };
    return encryptObj;
  } catch (error) {
    console.log(error);
    return false;
  }
}

exports.encryptExtensionKey = encryptExtensionKey;
