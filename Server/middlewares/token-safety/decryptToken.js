const CryptoJS = require("crypto-js");
const { user } = require("../../models/users");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const CRYPTO_SECRET_KEY = keysObject.CRYPTO_SECRET_KEY;

module.exports = async function (req, res, next) {
  try {
    const accountUser = await user.findById(userDetails._id);
    const iv = accountUser.iv;
    const encryptedToken = accountUser.trello_token;
    const decryptedData = CryptoJS.AES.decrypt(
      encryptedToken,
      CRYPTO_SECRET_KEY,
      {
        iv,
      }
    );

    // Convert the decrypted data to a readable string (assuming the original plaintext was a string)
    const decryptedToken = decryptedData.toString(CryptoJS.enc.Utf8);
    token = decryptedToken;
    key = keysObject.CLIENT_SECRET_KEY;
    signature = accountUser.sessionSignature;
    creditsAvailable = accountUser.credits;

    if (!token && !key)
      return res.status(401).json({ unauthorizedToken: true });

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ unauthorizedToken: true });
    return false;
  }
};
