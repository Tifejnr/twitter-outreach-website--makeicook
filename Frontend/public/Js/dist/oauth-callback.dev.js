"use strict";

var callbackUrl = "http://localhost:3000/authorization-callback"; // const callbackUrl = "http://localhost:3000/authorization-callback";
//get cookie to be sent to server

function getCookie(name) {
  var cookie = document.cookie.split("; ").find(function (cookie) {
    return cookie.startsWith("".concat(name, "="));
  });
  return cookie ? cookie.split("=")[1] : null;
} // Usage:


console.log(token);

if (cftAuthValue !== null) {
  console.log("cftAuth cookie value:", cftAuthValue);
} else {
  console.log("cftAuth cookie not found");
}

(function _callee() {
  var token, data, response, responseData, redirectUrl;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = getCookie("cftAuth");
          data = {
            token: token
          };
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }));

        case 5:
          response = _context.sent;

          if (response.ok) {
            _context.next = 8;
            break;
          }

          throw new Error("HTTP error! Status: ".concat(response.status));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          responseData = _context.sent;
          console.log("Response data:", responseData);
          redirectUrl = responseData.redirectUrl;

          if (!redirectUrl) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", window.location.href = "/home");

        case 15:
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](2);
          console.error("Error:", _context.t0);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 17]]);
})();