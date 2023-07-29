"use strict";

var jwt = require("jsonwebtoken");

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys;

var keysObject = getKeys();
var JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

module.exports = function (req, res, next) {
  var token = req.cookies.cftAuth;
  if (!token) return res.status(401).json({
    unauthorizedToken: true
  });

  try {
    var decodedPayload = jwt.verify(token, JWT_PRIVATE_KEY);
    req.user = decodedPayload;
    userDetails = decodedPayload;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      jwtErrorVerification: error
    });
  }
};