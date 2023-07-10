const jwt = require("jsonwebtoken");
const { getSecretKeys } = require("../envKeys/allKeys");
const keysObject = getSecretKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

export default async function signJwt(accountUser) {
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
