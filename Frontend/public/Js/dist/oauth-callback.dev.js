"use strict";

var callbackUrl = "http://localhost:3000/authorization-callback"; // const callbackUrl = "http://localhost:3000/authorization-callback";
//get cookie to be sent to server

function getCookie(name) {
  var cookie = document.cookie.split("; ").find(function (cookie) {
    return cookie.startsWith("".concat(name, "="));
  });
  return cookie ? cookie.split("=")[1] : null;
} // Usage:


var token = getCookie("cftAuth");

if (cftAuthValue !== null) {
  console.log("cftAuth cookie value:", cftAuthValue);
} else {
  console.log("cftAuth cookie not found");
}

(function _callee() {
  var data, response, responseData, redirectUrl;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = {
            token: token
          };
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }));

        case 4:
          response = _context.sent;

          if (response.ok) {
            _context.next = 7;
            break;
          }

          throw new Error("HTTP error! Status: ".concat(response.status));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          responseData = _context.sent;
          console.log("Response data:", responseData);
          redirectUrl = responseData.redirectUrl;

          if (!redirectUrl) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", window.location.href = "/home");

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          console.error("Error:", _context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 16]]);
})();