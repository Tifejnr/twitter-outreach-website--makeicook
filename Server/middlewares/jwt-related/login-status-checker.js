const jwt = require("jsonwebtoken");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;
let token;

module.exports = function (req, res, next) {
  const { jwtToken } = req.body;

  res.cookie("cftAuth", jwtToken, {
    maxAge: 1209600000,
  });
  token = jwtToken;
  if (req.cookies.cftAuth) {
    token = req.cookies.cftAuth;
  }

  if (!token) return res.status(401).json({ unauthorizedToken: true });

  try {
    const decodedPayload = jwt.verify(token, JWT_PRIVATE_KEY);
    req.user = decodedPayload;
    userDetails = decodedPayload;
    next();
  } catch (ex) {
    console.log(ex);
    res.status(400).json({ unauthorizedToken: true });
  }
};
