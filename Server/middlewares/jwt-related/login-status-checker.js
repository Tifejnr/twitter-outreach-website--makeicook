const jwt = require("jsonwebtoken");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

module.exports = function (req, res, next) {
  const { jwtToken } = req.body;
  const token = jwtToken;
  if (!token) return res.status(401).json({ unauthorizedToken: true });

  try {
    const decodedPayload = jwt.verify(token, JWT_PRIVATE_KEY);
    req.user = decodedPayload;
    userDetails = decodedPayload;
    next();
  } catch (ex) {
    res.status(400).json({ unauthorizedToken: true });
  }
};
