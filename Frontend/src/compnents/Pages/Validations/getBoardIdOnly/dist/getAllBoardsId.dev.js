"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function getAllBoardsId(boardsCollection) {
  var boardsIdOnly = boardsCollection.map(function (board, index) {
    var boardId = board.id;
    var neededObj = {
      boardId: boardId
    };
    return neededObj;
  });
  if (!boardsIdOnly) return "";
  return {
    boardsIdOnly: boardsIdOnly
  };
}

var _default = getAllBoardsId;
exports["default"] = _default;