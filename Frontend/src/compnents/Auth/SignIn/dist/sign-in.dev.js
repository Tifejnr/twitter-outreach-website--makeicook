"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = signInUser;

var _axios = _interopRequireDefault(require("axios"));

var _websiteUrl = require("../../../JS functions/websiteUrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function signInUser(signInParams) {
  var signInEndPoint, response, data, errorMessage;
  return regeneratorRuntime.async(function signInUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          signInEndPoint = "".concat(_websiteUrl.websiteUrl, "/api/sign-in");
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post(signInEndPoint, signInParams));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.data);

        case 7:
          data = _context.sent;

          if (data.signedIn) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", false);

        case 10:
          return _context.abrupt("return", true);

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          // console.log(error.response.data);
          errorMessage = _context.t0.response.data.invalidLoginDetails;

          if (!errorMessage) {
            _context.next = 18;
            break;
          }

          return _context.abrupt("return", {
            errorMessage: errorMessage
          });

        case 18:
          return _context.abrupt("return", false);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 13]]);
}