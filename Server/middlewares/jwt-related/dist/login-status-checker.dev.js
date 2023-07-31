"use strict";

var jwt = require("jsonwebtoken");

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys;

var keysObject = getKeys();
var JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

module.exports = function (req, res, next) {
  var token = req.cookies.cftAuth; // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFkODBiNjMxODI1Njc2YTNmY2VjNzciLCJpc1BhaWQiOmZhbHNlLCJpYXQiOjE2OTA2MDYyNDQsImV4cCI6MTY5MzE5ODI0NH0.eWQOJxMQNsu8xKIxcm8YcJr1dUNakCfO3pg5buZuqgk`;

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