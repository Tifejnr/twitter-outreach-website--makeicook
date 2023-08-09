const { getMemberId } = require("./getMembersId");

function findMemberId(req, res) {
  const { memberUsername, boardCollection } = req.body;

  const boardDetailsObj = boardCollection.map(async (board, index) => {
    const boardId = board.id;

    const foundBoard = getMemberId(memberUsername, boardId);

    return neededObj;
  });

  if (!boardDetailsObj) return "";
}
