const jwt = require("jsonwebtoken");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

module.exports = function (req, res, next) {
  // const token = req.cookies.cftAuth;
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFkODBiNjMxODI1Njc2YTNmY2VjNzciLCJpc1BhaWQiOmZhbHNlLCJpYXQiOjE2OTA2MDYyNDQsImV4cCI6MTY5MzE5ODI0NH0.eWQOJxMQNsu8xKIxcm8YcJr1dUNakCfO3pg5buZuqgk`;

  if (!token) return res.status(401).json({ invalidJWT: true });

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
