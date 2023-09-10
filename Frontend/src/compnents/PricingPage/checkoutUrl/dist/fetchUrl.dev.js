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

          if (token) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", false);

        case 3:
          paramToServer = {
            planName: planName.trim(),
            token: token
          };
          isUserLoggedInEndpoint = "".concat(_websiteUrl.websiteUrl, "/api/checkout");
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(_axios["default"].post(isUserLoggedInEndpoint, paramToServer));

        case 8:
          response = _context.sent;

          if (!response.unauthorizedToken) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", response);

        case 11:
          checkoutUrl = response.data.checkoutUrl;
          console.log(checkoutUrl);

          if (!checkoutUrl) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", {
            checkoutUrl: checkoutUrl
          });

        case 15:
          _context.next = 24;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](5);
          console.log("checkout error", _context.t0);
          errorDetail = _context.t0.response.data;

          if (!errorDetail) {
            _context.next = 23;
            break;
          }

          return _context.abrupt("return", errorDetail);

        case 23:
          return _context.abrupt("return", false);

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 17]]);
}