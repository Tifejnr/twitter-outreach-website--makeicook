const jwt = require("jsonwebtoken");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

module.exports = function (req, res, next) {
  // const token = req.cookies.cftAuth;
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM4ZmJhMGRiMjA1ZGMzZDM1NDdmMzQiLCJpc1BhaWQiOmZhbHNlLCJpYXQiOjE2OTE0ODUzMjEsImV4cCI6MTY5NDA3NzMyMX0.ySR9e3Snz5z08_bOrng0bXjI_NVDDgZXvmziquWuLjo`;

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
