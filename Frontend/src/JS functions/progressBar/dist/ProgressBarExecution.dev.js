"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ProgressBarExecution;

var _EleDisplay = require("../Utilis/EleDisplay");

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function ProgressBarExecution(progressBarParams) {
  var userDetail = progressBarParams.userDetail;
  var boardName = progressBarParams.boardName;
  var isAddedTo = progressBarParams.isAddedTo;
  var noOfCheckedCheckbox = progressBarParams.noOfCheckedCheckbox;
  var successLength = progressBarParams.succes;
  var action = progressBarParams.action;
  var failuresArrayLength = progressBarParams.failuresArray;
  var totalAttemptedArrayLength = progressBarParams.totalAttemptedArray;
  var totalDurationLength = progressBarParams.totalDurationLength;

  if (failuresArrayLength == undefined) {
    failuresArrayLength = (_readOnlyError("failuresArrayLength"), 0);
  }

  var progressBarTitle = document.getElementById("progressBarTitle");
  var successStatusTitle = document.getElementById("successStatusTitle");
  var failureTitle = document.getElementById("failureTitle");
  var mainContentCont = document.getElementById("mainContentCont");
  var BAR = document.getElementById("bar");
  var progressBarContainer = document.getElementById("loading");
  var allForms = document.getElementsByTagName("form");
  progressBarTitle.innerHTML = ""; //Hide main ele

  (0, _EleDisplay.hide)(mainContentCont);
  (0, _EleDisplay.hideForms)(allForms);
  (0, _EleDisplay.display)(progressBarContainer);
  (0, _EleDisplay.display)(btnSection);

  if (action == "deleting") {
    progressBarTitle.innerHTML = "Deleting ".concat(userDetail, " from ").concat(noOfCheckedCheckbox, " Boards... ");
    successStatusTitle.innerHTML = "Successful ".concat(isAddedTo, " Deletions: ").concat(successLength);
    failureTitle.innerHTML = "Failed Deletions: ".concat(failuresArrayLength);
  }

  if (action == "adding") {
    progressBarTitle.innerHTML = "Adding ".concat(userDetail, " to ").concat(noOfCheckedCheckbox, "  Boards... ");
    successStatusTitle.innerHTML = "Successful ".concat(isAddedTo, " Additions: ").concat(successLength);
    failureTitle.innerHTML = "Failed Additions: ".concat(failuresArrayLength);
  }

  var percentLoaded = Number(totalAttemptedArrayLength) / Number(totalDurationLength) * 100;
  BAR.style.width = "".concat(percentLoaded, "%");
  if (percentLoaded === 100) return succesMess(action);
}

function succesMess(action) {
  setTimeout(function () {
    var progressBarTitle = document.getElementById("progressBarTitle");
    var okayEl = document.getElementById("okay");
    var cancelEl = document.getElementById("cancelBtn");
    var completedStatus = document.getElementById("completedStatus");

    if (action == "deleting") {
      completedStatus.innerHTML = "Member Deletion Completed ";
    }

    if (action == "adding") {
      completedStatus.innerHTML = "Member Addition Completed ";
    }

    return (0, _EleDisplay.display)(okayEl), (0, _EleDisplay.hide)(progressBarTitle), (0, _EleDisplay.hide)(cancelEl);
  }, 600);
}