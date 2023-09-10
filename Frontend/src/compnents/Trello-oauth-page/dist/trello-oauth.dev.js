"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = trelloAuthRedirect;

var _axios = _interopRequireDefault(require("axios"));

var _websiteUrl = require("../../JS functions/websiteUrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function trelloAuthRedirect() {
  var trelloAuthEndpoint, response, data, errorMessage;
  return regeneratorRuntime.async(function trelloAuthRedirect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          trelloAuthEndpoint = "".concat(_websiteUrl.websiteUrl, "/authorize");
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post(trelloAuthEndpoint));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.data);

        case 7:
          data = _context.sent;

          if (data.authorizationUrl) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", false);

        case 10:
          return _context.abrupt("return", window.location.href = data.authorizationUrl);

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          errorMessage = _context.t0.response.data;
          console.log(errorMessage);
          return _context.abrupt("return", false);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 13]]);
}