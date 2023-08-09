function findBoardIdByName(boardCollection, boardName) {
  return boardCollection.find((board) => board.name === boardName);
}

export { findBoardIdByName };
