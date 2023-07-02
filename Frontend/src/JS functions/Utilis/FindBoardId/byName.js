function findBoardIdByName(boardCollection, boardName) {
  return boardCollection.find((user) => user.name === boardName);
}


export {findBoardIdByName}