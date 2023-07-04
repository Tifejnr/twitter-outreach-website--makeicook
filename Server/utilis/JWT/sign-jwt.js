const jwt = require("jsonwebtoken");
const { getKeys } = require("../envKeys/allKeys");

const keysObj = getKeys();
const JWT_PRIVATE_KEY = keysObj.JWT_PRIVATE_KEY;

async function signJwt(jwtProps) {
  const jwtProps = { _id: accountUser._id, isPaid: accountUser.isPaid };
  try {
    const token = jwt.sign(jwtProps, JWT_PRIVATE_KEY);

    if (token) return token;
  } catch (error) {
    console.log(error);
  }
}

exports.signJwt = signJwt;
