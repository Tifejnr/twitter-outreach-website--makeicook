"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isLoginAndAuthorized;

var _axios = _interopRequireDefault(require("axios"));

var _websiteUrl = require("../../JS functions/websiteUrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isLoginAndAuthorized() {
  var isUserAuthorized, response, data, errorMessage;
  return regeneratorRuntime.async(function isLoginAndAuthorized$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          isUserAuthorized = "".concat(_websiteUrl.websiteUrl, "/is-account-authorized");
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post(isUserAuthorized));

        case 4:
          response = _context.sent;
          console.log(response);
          data = response.data;

          if (!data) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", data);

        case 9:
          return _context.abrupt("return", false);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0.response);
          errorMessage = _context.t0.response.data.unAuthorizedToken;
          return _context.abrupt("return", false);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 12]]);
}