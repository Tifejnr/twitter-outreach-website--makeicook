"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getCheckoutLink;

var _axios = _interopRequireDefault(require("axios"));

var _websiteUrl = require("../../../JS functions/websiteUrl");

var _getCookies = _interopRequireDefault(require("../../utilis/cookiesSetting/getCookies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getCheckoutLink(planName) {
  var token, paramToServer, isUserLoggedInEndpoint, response, checkoutUrl, errorDetail;
  return regeneratorRuntime.async(function getCheckoutLink$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = (0, _getCookies["default"])();
          paramToServer = {
            planName: planName.trim(),
            token: token
          };
          isUserLoggedInEndpoint = "".concat(_websiteUrl.websiteUrl, "/api/checkout");
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(_axios["default"].post(isUserLoggedInEndpoint, paramToServer));

        case 6:
          response = _context.sent;

          if (!response.unauthorizedToken) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", response);

        case 9:
          checkoutUrl = response.data.checkoutUrl;

          if (!checkoutUrl) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", {
            checkoutUrl: checkoutUrl
          });

        case 12:
          _context.next = 21;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);
          console.log("checkout error", _context.t0);
          errorDetail = _context.t0.response.data;

          if (!errorDetail) {
            _context.next = 20;
            break;
          }

          return _context.abrupt("return", errorDetail);

        case 20:
          return _context.abrupt("return", false);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 14]]);
}