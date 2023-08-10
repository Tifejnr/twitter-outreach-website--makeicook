"use strict";

var axios = require("axios");

function getWorkspaceName(req, res) {
  var workspaceId, workspaceNameGettingUrl, response, workspaceName;
  return regeneratorRuntime.async(function getWorkspaceName$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          workspaceId = req.body.workspaceId;
          workspaceNameGettingUrl = "https://api.trello.com/1/organizations/".concat(workspaceId, "?&key=").concat(key, "&token=").concat(token);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(axios.get(workspaceNameGettingUrl));

        case 5:
          response = _context.sent;

          if (!(response.status === 200)) {
            _context.next = 9;
            break;
          }

          workspaceName = response.data.displayName;
          return _context.abrupt("return", res.status(200).json({
            workspaceName: workspaceName
          }));

        case 9:
          _context.next = 16;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          console.error("Error:", _context.t0);
          console.error(_context.t0.message);
          res.status(400).json({
            error: _context.t0
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 11]]);
}

exports.getWorkspaceName = getWorkspaceName;