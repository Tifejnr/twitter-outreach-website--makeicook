const jwt = require("jsonwebtoken");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

module.exports = function (req, res, next) {
  console.log(req.body);
  const { token } = req.body;
  // const token = req.cookies.cftAuth;
  // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM4ZmJhMGRiMjA1ZGMzZDM1NDdmMzQiLCJpc1BhaWQiOmZhbHNlLCJpYXQiOjE2OTE5NzI2NjAsImV4cCI6MTY5NDU2NDY2MH0.Uaok4cyZK2StmgR6kgiuE6gqNpcQq1_bZsTWbGMd1mk`;
  // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGNmY2YyYWRiMjA1ZGMzZDM1NDdmYjkiLCJpc1BhaWQiOmZhbHNlLCJpYXQiOjE2OTM0MjUxNDksImV4cCI6MTY5NjAxNzE0OX0.32YELvzBlN2U7WvgDAgoWvEHvAOivx27DmA00CaYspw`;
  console.log(token);

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
