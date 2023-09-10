"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isUserLoggedIn;

var _axios = _interopRequireDefault(require("axios"));

var _websiteUrl = require("../websiteUrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isUserLoggedIn() {
  var isUserLoggedInEndpoint, response, data, errorMessage;
  return regeneratorRuntime.async(function isUserLoggedIn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          isUserLoggedInEndpoint = "".concat(_websiteUrl.websiteUrl, "/isloggedIn");
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post(isUserLoggedInEndpoint));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.data);

        case 7:
          data = _context.sent;

          if (data.loggedIn) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", false);

        case 10:
          return _context.abrupt("return", true);

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0.response.data);
          errorMessage = _context.t0.response.data.unAuthorizedToken;
          return _context.abrupt("return", false);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 13]]);
}