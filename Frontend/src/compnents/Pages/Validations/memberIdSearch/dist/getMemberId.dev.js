"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getMemberId;

var _axios = _interopRequireDefault(require("axios"));

var _websiteUrl = require("../../../../JS functions/websiteUrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getMemberId(allBoardsId) {
  var getMemberIdUrl, response;
  return regeneratorRuntime.async(function getMemberId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          getMemberIdUrl = "".concat(_websiteUrl.websiteUrl, "/find-member-id");
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post(getMemberIdUrl, {
            allBoardsId: allBoardsId
          }));

        case 4:
          response = _context.sent;

          if (response) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", console.log("no response"));

        case 7:
          return _context.abrupt("return", response.data);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.error("Error now:", _context.t0);
          return _context.abrupt("return", {
            error: _context.t0
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
}