//loop through all boards collection and search if member exist by sending request to the server

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
