"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AddToBoards;

var _axios = _interopRequireDefault(require("axios"));

var _ProgressBarExecution = _interopRequireDefault(require("../../JS functions/progressBar/ProgressBarExecution"));

var _Input = require("../../JS functions/Utilis/Validations/Input");

var _sliderValidation = require("../../JS functions/Utilis/Validations/sliderValidation");

var _Checkbox = require("../../JS functions/Utilis/Validations/Checkbox");

var _byName = require("../../JS functions/Utilis/FindBoardId/byName");

var _websiteUrl = require("../../JS functions/websiteUrl");

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
              var addMembersUrl, response, data, showSuccessParams;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      addMembersUrl = "".concat(_websiteUrl.websiteUrl, "/add");
                      _context.prev = 1;
                      _context.next = 4;
                      return regeneratorRuntime.awrap(_axios["default"].post(addMembersUrl, message));

                    case 4:
                      response = _context.sent;
                      console.log(response.status);
                      data = response;
                      console.log(data.status);

                      if (data.error) {
                        console.log(data);
                        failuresArray += 1;

                        if (data.error.cause.code == "ECONNRESET") {
                          console.log("internet broke error");
                        }
                      }

                      console.log(data);
                      succes += 1;
                      _context.next = 16;
                      break;

                    case 13:
                      _context.prev = 13;
                      _context.t0 = _context["catch"](1);
                      console.log(_context.t0);

                    case 16:
                      _context.prev = 16;
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
                      return _context.finish(16);

                    case 22:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[1, 13, 16, 22]]);
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
            }, index * noOfCheckedCheckbox * timeInterval * 1.36);
          });

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  });
}