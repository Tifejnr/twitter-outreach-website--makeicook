"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getCheckoutLink;

var _axios = _interopRequireDefault(require("axios"));

var _websiteUrl = require("../../../JS functions/websiteUrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getCheckoutLink(planName) {
  var paramToServer, isUserLoggedInEndpoint, response, checkoutUrl, errorDetail;
  return regeneratorRuntime.async(function getCheckoutLink$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          paramToServer = {
            planName: planName
          };
          isUserLoggedInEndpoint = "".concat(_websiteUrl.websiteUrl, "/api/checkout");
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].post(isUserLoggedInEndpoint, paramToServer));

        case 5:
          response = _context.sent;

          if (!response.unauthorizedToken) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", response);

        case 8:
          checkoutUrl = response.data.checkoutUrl;

          if (!checkoutUrl) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", checkoutUrl);

        case 11:
          _context.next = 19;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](2);
          errorDetail = _context.t0.response.data;

          if (!errorDetail) {
            _context.next = 18;
            break;
          }

          return _context.abrupt("return", errorDetail);

        case 18:
          return _context.abrupt("return", false);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 13]]);
}