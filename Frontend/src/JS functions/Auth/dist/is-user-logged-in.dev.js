"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isUserLoggedIn;

var _axios = _interopRequireDefault(require("axios"));

var _websiteUrl = require("../websiteUrl");

var _getCookies = _interopRequireDefault(require("../../compnents/utilis/cookiesSetting/getCookies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isUserLoggedIn() {
  var token, isUserLoggedInEndpoint, response, data, errorMessage;
  return regeneratorRuntime.async(function isUserLoggedIn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = (0, _getCookies["default"])();

          if (token) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", false);

        case 3:
          isUserLoggedInEndpoint = "".concat(_websiteUrl.websiteUrl, "/isloggedIn");
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(_axios["default"].post(isUserLoggedInEndpoint, {
            token: token
          }));

        case 7:
          response = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(response.data);

        case 10:
          data = _context.sent;

          if (data.loggedIn) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", false);

        case 13:
          return _context.abrupt("return", true);

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](4);
          console.log(_context.t0.response.data);
          errorMessage = _context.t0.response.data.unAuthorizedToken;
          return _context.abrupt("return", false);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 16]]);
}