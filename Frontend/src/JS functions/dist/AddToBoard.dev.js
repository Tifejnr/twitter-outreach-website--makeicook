"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AddToBoards;

var _ProgressBarExecution = _interopRequireDefault(require("./progressBar/ProgressBarExecution"));

var _Input = require("./Utilis/Validations/Input");

var _Checkbox = require("./Utilis/Validations/Checkbox");

var _byName = require("./Utilis/FindBoardId/byName");

var _websiteUrl = require("./websiteUrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var succes, failuresArray, totalAttemptedArray, totalDurationLength, userDetail, noOfCheckedCheckbox, boardName, userDetailsLength;
var showSuccessParams = {};
var action = "adding";
var isAddedTo = "boards";

function AddToBoards(executionParams) {
  var boardsCollection, emailInputs, textAreaRef, allCheckboxesOnPage, emailListSplited, boardDetailsObj, Execution;
  return regeneratorRuntime.async(function AddToBoards$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          Execution = function _ref(email, boardId, boardName) {
            userDetail = email;
            var message = {
              email: email,
              boardId: boardId
            };

            (function _callee() {
              var response, data, _showSuccessParams;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return regeneratorRuntime.awrap(fetch("".concat(_websiteUrl.websiteUrl, "/add"), {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(message)
                      }));

                    case 3:
                      response = _context.sent;
                      _context.next = 6;
                      return regeneratorRuntime.awrap(response.json());

                    case 6:
                      data = _context.sent;

                      if (data.error) {
                        console.log(data);

                        if (data.error.cause.code == "ECONNRESET") {
                          console.log("internet broke error");
                        }

                        failuresArray += 1;
                      }

                      console.log(data);
                      succes += 1;
                      _context.next = 15;
                      break;

                    case 12:
                      _context.prev = 12;
                      _context.t0 = _context["catch"](0);
                      console.log(_context.t0);

                    case 15:
                      _context.prev = 15;
                      totalAttemptedArray += 1;
                      _showSuccessParams = {
                        userDetail: userDetail,
                        boardName: boardName,
                        isAddedTo: isAddedTo,
                        noOfCheckedCheckbox: noOfCheckedCheckbox,
                        succes: succes,
                        action: action,
                        failuresArray: failuresArray,
                        totalAttemptedArray: totalAttemptedArray,
                        totalDurationLength: totalDurationLength
                      };
                      (0, _ProgressBarExecution["default"])(_showSuccessParams);
                      console.log(totalDurationLength, totalAttemptedArray, succes, failuresArray);
                      return _context.finish(15);

                    case 21:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[0, 12, 15, 21]]);
            })();
          };

          boardsCollection = executionParams.boardsCollection;
          emailInputs = executionParams.textAreaValue;
          textAreaRef = executionParams.textAreaRefEl;

          if ((0, _Input.validateInput)(emailInputs, textAreaRef)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", false);

        case 6:
          if ((0, _Checkbox.isAnyCheckboxChecked)()) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", false);

        case 8:
          allCheckboxesOnPage = document.querySelectorAll(".board-checkbox");
          noOfCheckedCheckbox = document.querySelectorAll(".board-checkbox:checked").length;
          emailListSplited = emailInputs.split(",");
          userDetailsLength = Number(emailListSplited.length);
          totalDurationLength = Number(noOfCheckedCheckbox) * userDetailsLength;
          boardDetailsObj = Array.from(allCheckboxesOnPage).map(function (checkbox, index) {
            var checkboxEl = document.getElementById("check".concat(index));
            if (!checkboxEl.checked) return false;
            var checkboxId = checkbox.id;
            var arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));
            var boardEl = document.getElementById("labelcheck".concat(arrayNoFromId));
            boardName = boardEl.innerHTML;
            var foundBoard = (0, _byName.findBoardIdByName)(boardsCollection, boardName);
            if (!foundBoard) return console.log("board not found");
            var boardId = foundBoard.id;
            var neededObj = {
              boardId: boardId,
              boardName: boardName
            };
            return neededObj;
          });

          if (boardDetailsObj) {
            _context2.next = 16;
            break;
          }

          return _context2.abrupt("return", "");

        case 16:
          totalAttemptedArray = 0; // each email execution to server

          emailListSplited.map(function (eachEmail, index) {
            var email = eachEmail.trim(); //loop through all checked boards

            setTimeout(function () {
              boardDetailsObj.map(function (boardObj, index) {
                succes = 0;
                failuresArray = 0;
                var boardId = boardObj.boardId;
                boardName = boardObj.boardName;
                if (!boardId && !boardName) return console.log("board id not found");
                setTimeout(function () {
                  new Execution(email, boardId, boardName);
                }, index * 1000);
              });
            }, index * 1300 * noOfCheckedCheckbox);
          });

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
}