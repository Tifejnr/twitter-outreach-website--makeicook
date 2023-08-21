"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = boardIdAndName;

var _byName = require("./FindBoardId/byName");

function boardIdAndName(paramsForboardIdAndName) {
  var memberCheckboxesArray = paramsForboardIdAndName.memberCheckboxesArray;
  var allUserMemberDetail = paramsForboardIdAndName.allUserMemberDetail;
  var boardDetailsObj = memberCheckboxesArray.map(function (checkbox, index) {
    if (!checkbox.checked) return false;
    var checkboxId = checkbox.id;
    var arrayNoFromId = Number(checkboxId.replace(/\D/g, ""));
    var boardEl = document.getElementById("labelcheck".concat(arrayNoFromId));
    var boardName = boardEl.textContent;
    var foundBoard = (0, _byName.findBoardIdByName)(allUserMemberDetail, boardName);
    if (!foundBoard) return console.log("board not found");
    var boardId = foundBoard.id;
    var neededObj = {
      boardId: boardId,
      boardName: boardName
    };
    return neededObj;
  });
  if (!boardDetailsObj) return "";
  return boardDetailsObj;
}