"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getWorkspacesName;

var _axios = _interopRequireDefault(require("axios"));

var _websiteUrl = require("../../JS functions/websiteUrl");

var _getCookies = _interopRequireDefault(require("../utilis/cookiesSetting/getCookies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getWorkspacesName(workspaceId) {
  var token, paramToServer, fetchWorkspaceNameUrl, response, workspaceName, errorMessage;
  return regeneratorRuntime.async(function getWorkspacesName$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = (0, _getCookies["default"])();

          if (token) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", {
            error: "No token"
          });

        case 4:
          paramToServer = {
            workspaceId: workspaceId,
            token: token
          };
          fetchWorkspaceNameUrl = "".concat(_websiteUrl.websiteUrl, "/get-workspace-name");
          _context.next = 8;
          return regeneratorRuntime.awrap(_axios["default"].post(fetchWorkspaceNameUrl, paramToServer));

        case 8:
          response = _context.sent;
          workspaceName = response.data.workspaceName;

          if (!workspaceName) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", workspaceName);

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          //handle any error from server or internet
          console.log(_context.t0);
          errorMessage = _context.t0.response.data; //Unauthorized handling

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}