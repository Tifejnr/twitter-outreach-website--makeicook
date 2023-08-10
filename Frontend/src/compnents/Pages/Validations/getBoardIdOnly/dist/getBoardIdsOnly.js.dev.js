"use strict";

function getAllBoardsId(boardsCollection) {
  var boardsIdOnly = boardsCollection.map(function (board, index) {
    var boardId = board.id;
    var neededObj = {
      boardId: boardId
    };
    return neededObj;
  });
  if (!boardsIdOnly) return "";
  console.log(boardsIdOnly);
  return {
    boardsIdOnly: boardsIdOnly
  };
}