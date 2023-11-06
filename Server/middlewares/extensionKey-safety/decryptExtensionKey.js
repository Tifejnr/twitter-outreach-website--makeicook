const CryptoJS = require("crypto-js");
const { user } = require("../../models/users");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const CRYPTO_SECRET_KEY = keysObject.CRYPTO_SECRET_KEY;

async function decryptExtensionKey(userId) {
  try {
    const accountUser = await user.findById(userId);
    const extensionKeyDecrypter = accountUser.extensionKeyDecrypter;
    const encryptedExtensionKey = accountUser.extensionKey;
    const decryptedData = CryptoJS.AES.decrypt(
      encryptedExtensionKey,
      CRYPTO_SECRET_KEY,
      {
        extensionKeyDecrypter,
      }
    );

    // Convert the decrypted data to a readable string (assuming the original plaintext was a string)
    const decryptedExtensionKey = decryptedData.toString(CryptoJS.enc.Utf8);

    if (!decryptedExtensionKey) return { unauthorizedExtensionKey: true };

    return decryptedExtensionKey;
  } catch (error) {
    console.log(error);
    res.status(400).json({ extensionKeyDecryptionError: error });
    return false;
  }
}

exports.decryptExtensionKey = decryptExtensionKey;
