const jwt = require("jsonwebtoken");
const { getKeys } = require("../envKeys/allKeys");
const keysObject = getKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

async function signJwt(accountUser) {
  try {
    const jwtSigned = jwt.sign(
      { _id: accountUser._id, isPaid: accountUser.isPaid },
      JWT_PRIVATE_KEY
    );

    if (jwtSigned) return jwtSigned;
  } catch (error) {
    return console.log(error);
  }
}

exports.signJwt = signJwt;
