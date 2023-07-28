"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AddToBoards;

var _ProgressBarExecution = _interopRequireDefault(require("./progressBar/ProgressBarExecution"));

var _Input = require("./Utilis/Validations/Input");

var _sliderValidation = require("./Utilis/Validations/sliderValidation");

var _Checkbox = require("./Utilis/Validations/Checkbox");

var _byName = require("./Utilis/FindBoardId/byName");

var _websiteUrl = require("./websiteUrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var succes, failuresArray, totalAttemptedArray, totalDurationLength, userDetail, noOfCheckedCheckbox, userDetailsLength, roundIndex;
var action = "adding";
var isAddedTo = "Boards";

function AddToBoards(executionParams) {
  var boardsCollection, emailInputs, textAreaRef, timeIntervalValue, timeIntervalRef, pageContentElRef, clientSignature, allCheckboxesOnPage, emailListSplited, boardDetailsObj, timeInterval, Execution;
  return regeneratorRuntime.async(function AddToBoards$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          Execution = function _ref(email, boardId, boardName) {
            if (!boardName) return console.log("boardname does not exist");
            console.log(boardName, roundIndex);
            userDetail = email;
            var message = {
              email: email,
              boardId: boardId,
              clientSignature: clientSignature
            };

            (function _callee() {
              var response, data, showSuccessParams;
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
                        failuresArray += 1;

                        if (data.error.cause.code == "ECONNRESET") {
                          console.log("internet broke error");
                        }
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
                      showSuccessParams = {
                        userDetail: userDetail,
                        boardName: boardName,
                        isAddedTo: isAddedTo,
                        noOfCheckedCheckbox: noOfCheckedCheckbox,
                        userDetailsLength: userDetailsLength,
                        succes: succes,
                        action: action,
                        failuresArray: failuresArray,
                        totalAttemptedArray: totalAttemptedArray,
                        totalDurationLength: totalDurationLength,
                        roundIndex: roundIndex
                      };
                      (0, _ProgressBarExecution["default"])(showSuccessParams);
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
          timeIntervalValue = Number(executionParams.timeInterval);
          timeIntervalRef = executionParams.timeIntervalRef;
          pageContentElRef = executionParams.pageContentElRef;
          clientSignature = executionParams.clientSignature;

          if ((0, _Input.validateInput)(emailInputs, textAreaRef)) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", false);

        case 10:
          if ((0, _sliderValidation.timeIntervalSliderVal)(timeIntervalValue, timeIntervalRef)) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", console.log("slider whaala"));

        case 12:
          if ((0, _Checkbox.isAnyCheckboxChecked)()) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", false);

        case 14:
          allCheckboxesOnPage = document.querySelectorAll(".board-checkbox");
          noOfCheckedCheckbox = document.querySelectorAll(".board-checkbox:checked").length;
          emailListSplited = emailInputs.split(",");
          userDetailsLength = Number(emailListSplited.length);
          totalDurationLength = Number(noOfCheckedCheckbox) * userDetailsLength;
          boardDetailsObj = Array.from(allCheckboxesOnPage).map(function (checkbox, index) {
            if (!checkbox.checked) return false;
            var checkboxId = checkbox.id;
            var arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));
            var boardEl = document.getElementById("labelcheck".concat(arrayNoFromId));
            var boardName = boardEl.innerHTML;
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
            _context2.next = 22;
            break;
          }

          return _context2.abrupt("return", "");

        case 22:
          pageContentElRef.classList.add("blurred");
          timeInterval = timeIntervalValue * 1000;
          totalAttemptedArray = 0; // each email execution to server

          emailListSplited.map(function (eachEmail, index) {
            var email = eachEmail.trim();
            roundIndex = index + 1;
            setTimeout(function () {
              roundIndex = index + 1;
            }, index * noOfCheckedCheckbox * timeInterval * 1.35);

            if (totalAttemptedArray === 0) {
              var boardName = "...";
              userDetail = "...";
              succes = 0;
              failuresArray = 0;
              roundIndex = 1;
              var showSuccessParams = {
                userDetail: userDetail,
                boardName: boardName,
                isAddedTo: isAddedTo,
                noOfCheckedCheckbox: noOfCheckedCheckbox,
                succes: succes,
                action: action,
                failuresArray: failuresArray,
                totalAttemptedArray: totalAttemptedArray,
                totalDurationLength: totalDurationLength,
                roundIndex: roundIndex,
                userDetailsLength: userDetailsLength
              };
              (0, _ProgressBarExecution["default"])(showSuccessParams);
            } //loop through all checked boards


            setTimeout(function () {
              boardDetailsObj.map(function (boardObj, index) {
                var boardId = boardObj.boardId;
                var boardName = boardObj.boardName;
                if (!boardId && !boardName) return console.log("board id not found");
                succes = 0;
                failuresArray = 0;
                setTimeout(function () {
                  new Execution(email, boardId, boardName);
                }, index * timeInterval);
              });
            }, index * noOfCheckedCheckbox * timeInterval * 1.35);
          });

        case 26:
        case "end":
          return _context2.stop();
      }
    }
  });
}