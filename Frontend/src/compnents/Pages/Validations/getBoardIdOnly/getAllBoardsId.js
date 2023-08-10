function getAllBoardsId(boardsCollection) {
  const boardsIdOnly = boardsCollection.map((board, index) => {
    const boardId = board.id;

    const neededObj = {
      boardId,
    };

    return neededObj;
  });

  if (!boardsIdOnly) return "";

  return { boardsIdOnly };
}

export default getAllBoardsId;
