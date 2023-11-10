const jwt = require("jsonwebtoken");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

module.exports = function (req, res, next) {
  // let token = req.body.token;
  let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTA0N2RiNGExNjg5MDEyYjYxNjRmZGMiLCJpc1BhaWQiOmZhbHNlLCJpYXQiOjE2OTkxMjA3NTUsImV4cCI6MTcwMTcxMjc1NX0.DGGCfrwgePat8615k5UceWXOqoEiMtBR3jtbGe6NTIg`;
  // const serverToken = req.cookies;
  // // console.log(serverToken);

  // // try to fetch it from server if undefined
  // if (!token) {
  //   token = serverToken.cftAuth;
  //   console.log(token);
  // }
  // // const token = req.cookies.cftAuth;
  // // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTA0N2RiNGExNjg5MDEyYjYxNjRmZGMiLCJpc1BhaWQiOmZhbHNlLCJpYXQiOjE2OTczODUzOTgsImV4cCI6MTY5OTk3NzM5OH0.B0iperJqptD1elwZZPTegfUalLr9dp4bpahMjg2qKTA`;
  // // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGNmY2YyYWRiMjA1ZGMzZDM1NDdmYjkiLCJpc1BhaWQiOmZhbHNlLCJpYXQiOjE2OTM0MjUxNDksImV4cCI6MTY5NjAxNzE0OX0.32YELvzBlN2U7WvgDAgoWvEHvAOivx27DmA00CaYspw`;

  // console.log(token);

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
