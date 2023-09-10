"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getMemberId;

var _axios = _interopRequireDefault(require("axios"));

var _websiteUrl = require("../../../../JS functions/websiteUrl");

var _getCookies = _interopRequireDefault(require("../../../utilis/cookiesSetting/getCookies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getMemberId(allBoardsId) {
  var getMemberIdUrl, token, response;
  return regeneratorRuntime.async(function getMemberId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          getMemberIdUrl = "".concat(_websiteUrl.websiteUrl, "/find-member-id");
          token = (0, _getCookies["default"])();

          if (token) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", {
            error: "No token"
          });

        case 4:
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(_axios["default"].post(getMemberIdUrl, {
            allBoardsId: allBoardsId,
            token: token
          }));

        case 7:
          response = _context.sent;

          if (response) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", console.log("no response"));

        case 10:
          return _context.abrupt("return", response.data);

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](4);
          console.error("Error now:", _context.t0);
          return _context.abrupt("return", {
            error: _context.t0
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 13]]);
}