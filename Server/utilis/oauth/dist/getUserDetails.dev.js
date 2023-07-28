"use strict";

var axios = require("axios");

function getUserDetails(key, token) {
  var response, data;
  return regeneratorRuntime.async(function getUserDetails$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.get("https://api.trello.com/1/members/me?fields=fullName,username&key=".concat(key, "&token=").concat(token)));

        case 3:
          response = _context.sent;

          if (!(response.status === 200)) {
            _context.next = 10;
            break;
          }

          data = response.data;

          if (!data) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", data);

        case 8:
          _context.next = 11;
          break;

        case 10:
          console.log("Failed to get Trello information. Status code: ".concat(response.status));

        case 11:
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error("Error occurred:", _context.t0.message);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

exports.getUserDetails = getUserDetails;