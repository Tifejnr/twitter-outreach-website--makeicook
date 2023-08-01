"use strict";

var jwt = require("jsonwebtoken");

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys;

var keysObject = getKeys();
var JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

module.exports = function (req, res, next) {
  // const token = req.cookies.cftAuth;
  var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM4ZmJhMGRiMjA1ZGMzZDM1NDdmMzQiLCJpc1BhaWQiOmZhbHNlLCJpYXQiOjE2OTA4OTMyMTYsImV4cCI6MTY5MzQ4NTIxNn0.e2i70g0QpeK3VbRzS1aEo2P1dCqHM93kTS8_rhVemmE";
  if (!token) return res.status(401).json({
    invalidJWT: true
  });

  try {
    var decodedPayload = jwt.verify(token, JWT_PRIVATE_KEY);
    req.user = decodedPayload;
    userDetails = decodedPayload;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      invalidJWT: error
    });
  }
};