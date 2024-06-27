const jwt = require("jsonwebtoken");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

module.exports = function (req, res, next) {
  const originValue = response.headers.origin;

  if (!token) return res.status(401).json({ nullJWT: true });

  try {
    const decodedPayload = jwt.verify(token, JWT_PRIVATE_KEY);
    req.user = decodedPayload;
    userDetails = decodedPayload;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ invalidJWT: error });
  }
};

/* Handling it in response */
if (checkOrigin(response.headers.origin)) {
  // Let client get the thing from API
} else {
  response.write("Send them error that they're not allowed to use the API");
  response.end();
}

function checkOrigin(origin) {
  if (origin === "your.domain.tld") {
    return true;
  } else {
    return false;
  }
}
