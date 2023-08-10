"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = awaitIdsFetch;

var _getMemberIdByUsername = _interopRequireDefault(require("./getMemberIdByUsername"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function awaitIdsFetch(usernameSplitted, boardIdsObj) {
  var usernameAddingArray, promises;
  return regeneratorRuntime.async(function awaitIdsFetch$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          usernameAddingArray = []; // Create an array to hold promises

          promises = usernameSplitted.map(function _callee(memberUsername) {
            var getMemberIdServer, memberIdFound, memberId, usernameAddingObj;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap((0, _getMemberIdByUsername["default"])(memberUsername, boardIdsObj));

                  case 2:
                    getMemberIdServer = _context.sent;
                    _context.next = 5;
                    return regeneratorRuntime.awrap(getMemberIdServer);

                  case 5:
                    memberIdFound = _context.sent;

                    if (memberIdFound) {
                      _context.next = 8;
                      break;
                    }

                    return _context.abrupt("return");

                  case 8:
                    memberId = memberIdFound.memberIdFound;
                    usernameAddingObj = {
                      memberId: memberId,
                      memberUsername: memberUsername
                    };
                    usernameAddingArray.push(usernameAddingObj);

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          _context2.next = 4;
          return regeneratorRuntime.awrap(Promise.all(promises));

        case 4:
          console.log(usernameAddingArray);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}