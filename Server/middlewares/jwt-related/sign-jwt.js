const jwt = require("jsonwebtoken");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

async function signJwt(accountUser) {
  const expiresIn = "30d";
  try {
    const jwtSigned = jwt.sign(
      { _id: accountUser._id, isPaid: accountUser.isPaid },
      JWT_PRIVATE_KEY,
      { expiresIn }
    );

    if (jwtSigned) return jwtSigned;

    return false;
  } catch (error) {
    return console.log(error);
  }
}

exports.signJwt = signJwt;
