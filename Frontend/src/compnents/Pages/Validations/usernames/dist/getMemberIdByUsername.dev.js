"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getMemberIdByUsername;

var _axios = _interopRequireDefault(require("axios"));

var _websiteUrl = require("../../../../JS functions/websiteUrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getMemberIdByUsername(memberUsername, boardIdsObj) {
  var getMemberIdUrl, paramToServer, response;
  return regeneratorRuntime.async(function getMemberIdByUsername$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          getMemberIdUrl = "".concat(_websiteUrl.websiteUrl, "/find-member-id");
          paramToServer = {
            memberUsername: memberUsername,
            boardIdsObj: boardIdsObj
          };
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].post(getMemberIdUrl, paramToServer));

        case 5:
          response = _context.sent;
          console.log(response); // return response.data;

          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          console.error("Error:", _context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
}