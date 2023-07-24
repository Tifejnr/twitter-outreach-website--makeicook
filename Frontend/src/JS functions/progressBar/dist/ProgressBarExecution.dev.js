"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ProgressBarExecution;

var _EleDisplay = require("../Utilis/EleDisplay");

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function ProgressBarExecution(progressBarParams) {
  //Getting ele to manipulate
  var progressBarTitle = document.getElementById("progressBarTitle");
  var successStatusTitle = document.getElementById("successStatusTitle");
  var failureTitle = document.getElementById("failureTitle");
  var mainContentCont = document.getElementById("mainContentCont");
  var noOfRoundsEl = document.getElementById("noOfRounds");
  var totalRoundsEl = document.getElementById("totalRoundsEl");
  var BAR = document.getElementById("bar");
  var progressBarContainer = document.getElementById("loading");
  var allForms = document.getElementsByTagName("form");
  progressBarTitle.innerHTML = ""; //getting params values

  var userDetail = progressBarParams.userDetail;
  var boardName = progressBarParams.boardName;
  var isAddedTo = progressBarParams.isAddedTo;
  var noOfCheckedCheckbox = progressBarParams.noOfCheckedCheckbox;
  var successLength = progressBarParams.succes;
  var action = progressBarParams.action;
  var failuresArrayLength = progressBarParams.failuresArray;
  var totalAttemptedArrayLength = progressBarParams.totalAttemptedArray;
  var totalDurationLength = progressBarParams.totalDurationLength;
  var roundIndex = progressBarParams.roundIndex;
  var totalRounds = progressBarParams.userDetailsLength;

  if (failuresArrayLength == undefined) {
    failuresArrayLength = (_readOnlyError("failuresArrayLength"), 0);
  } //Hide main ele


  (0, _EleDisplay.hide)(mainContentCont);
  (0, _EleDisplay.hideForms)(allForms);
  (0, _EleDisplay.display)(progressBarContainer);
  (0, _EleDisplay.display)(btnSection);
  if (!boardName) return console.log("no board name or roundindex for progress");

  if (action == "deleting") {
    progressBarTitle.innerHTML = "Deleting ".concat(userDetail, " from ").concat(boardName, "  ");
    successStatusTitle.innerHTML = "Successful ".concat(isAddedTo, " Deletions: ").concat(successLength);
    failureTitle.innerHTML = "Failed Deletions: ".concat(failuresArrayLength);
  }

  if (action == "adding") {
    progressBarTitle.innerHTML = "Adding ".concat(userDetail, " to ").concat(boardName, " ");
    successStatusTitle.innerHTML = "Successful ".concat(isAddedTo, " Additions: ").concat(successLength);
    failureTitle.innerHTML = "Failed Additions: ".concat(failuresArrayLength);
    noOfRoundsEl.innerHTML = "Current Round : ".concat(roundIndex);

    if (totalRounds > 1) {
      totalRoundsEl.innerHTML = "Rounds to complete:  ".concat(totalRounds);
    } else {
      totalRoundsEl.innerHTML = "Round to complete:  ".concat(totalRounds);
    }
  }

  var percentLoaded = Number(totalAttemptedArrayLength) / Number(totalDurationLength) * 100;
  BAR.style.width = "".concat(percentLoaded, "%");
  if (percentLoaded === 100) return succesMess(action, totalRounds);

  function succesMess(action, totalRounds) {
    setTimeout(function () {
      var progressBarTitle = document.getElementById("progressBarTitle");
      var okayEl = document.getElementById("okay");
      var cancelEl = document.getElementById("cancelBtn");
      var completedStatus = document.getElementById("completedStatus");

      if (action == "deleting") {
        if (totalRounds > 1) completedStatus.innerHTML = "Members Deletion Completed ";else completedStatus.innerHTML = "Member Deletion Completed ";
      }

      if (action == "adding") {
        if (totalRounds > 1) completedStatus.innerHTML = "Members Addition Completed ";else completedStatus.innerHTML = "Member Addition Completed ";

        if (totalRounds > 1) {
          totalRoundsEl.innerHTML = "Completed Rounds:  ".concat(totalRounds);
        } else {
          totalRoundsEl.innerHTML = "Completed Round:  ".concat(totalRounds);
        }
      }

      return (0, _EleDisplay.display)(okayEl), (0, _EleDisplay.hide)(progressBarTitle), (0, _EleDisplay.hide)(cancelEl), (0, _EleDisplay.hide)(noOfRoundsEl);
    }, 600);
  }
}