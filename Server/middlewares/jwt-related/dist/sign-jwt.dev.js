"use strict";

var jwt = require("jsonwebtoken");

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys;

var keysObject = getKeys();
var JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

function signJwt(accountUser) {
  var expiresIn, jwtSigned;
  return regeneratorRuntime.async(function signJwt$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          expiresIn = "30d";
          _context.prev = 1;
          jwtSigned = jwt.sign({
            _id: accountUser._id,
            isPaid: accountUser.isPaid
          }, JWT_PRIVATE_KEY, {
            expiresIn: expiresIn
          });

          if (!jwtSigned) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", jwtSigned);

        case 5:
          return _context.abrupt("return", false);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", console.log(_context.t0));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}

exports.signJwt = signJwt;