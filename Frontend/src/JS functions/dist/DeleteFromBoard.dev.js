"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DeleteMemberFromBoard;

var _ProgressBarExecution = _interopRequireDefault(require("./progressBar/ProgressBarExecution"));

var _Username = require("./Utilis/Validations/Username");

var _Checkbox = require("./Utilis/Validations/Checkbox");

var _byName = require("./Utilis/FindBoardId/byName");

var _websiteUrl = require("./websiteUrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import ShowSuccessMess from "./progressBar/SucessMessage";
var succes, failuresArray, totalAttemptedArray;

function DeleteMemberFromBoard(boardCollection) {
  var action, username, allCheckboxes;
  return regeneratorRuntime.async(function DeleteMemberFromBoard$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          action = "deleting";
          username = document.getElementById("resultoo").value;

          if ((0, _Username.validateUsername)(username)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", console.log("Problem"));

        case 4:
          if ((0, _Checkbox.isAnyCheckboxChecked)()) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", console.log("Checkboxes not checked"));

        case 6:
          allCheckboxes = document.querySelectorAll(".board-checkbox");
          ShowSuccessMess(100, 0, action);
          succes = [];
          failuresArray = [];
          totalAttemptedArray = [];
          username = (0, _Username.validateUsername)(username);
          Array.from(allCheckboxes).map(function (checkbox, index) {
            var checkboxEl = document.getElementById("check".concat(index));
            if (!checkboxEl.checked) return false;
            var checkboxId = checkbox.id;
            var arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));
            var boardEl = document.getElementById("labelcheck".concat(arrayNoFromId));
            var boardName = boardEl.innerHTML;
            var foundBoard = (0, _byName.findBoardIdByName)(boardCollection, boardName);
            if (!foundBoard) return console.log("board not found");
            var boardId = foundBoard.id;
            return new Execution(username, boardId, action);
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}

function Execution(username, boardId) {
  var noOfCheckedCheckbox = document.querySelectorAll("input:checked").length;
  var message = {
    username: username,
    boardId: boardId
  };

  function deleteMember() {
    var action, response, data;
    return regeneratorRuntime.async(function deleteMember$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            action = "deleting";
            _context2.next = 3;
            return regeneratorRuntime.awrap(fetch("".concat(_websiteUrl.websiteUrl, "/delete"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(message)
            }));

          case 3:
            response = _context2.sent;
            _context2.next = 6;
            return regeneratorRuntime.awrap(response.json());

          case 6:
            data = _context2.sent;
            totalAttemptedArray.push(1);

            if (!data.userNameNotFound) {
              _context2.next = 11;
              break;
            }

            failuresArray.push(1);
            return _context2.abrupt("return", ShowSuccessMess(noOfCheckedCheckbox, succes.length, action, failuresArray.length, totalAttemptedArray.length));

          case 11:
            succes.push(1);
            ShowSuccessMess(noOfCheckedCheckbox, succes.length, action, failuresArray.length, totalAttemptedArray.length);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    });
  }

  deleteMember()["catch"](function (error) {
    console.log(error);
  });
}