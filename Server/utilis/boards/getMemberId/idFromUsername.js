const { getMemberId } = require("./getMembersId");
const additionAction = "Addition";

async function findMemberId(req, res) {
  const { boardIdsObj } = req.body;

  const mainBoardsIdObj = boardIdsObj.boardsIdOnly;

  const boardId = board.boardId;

  //fetch workspace names for each boards
  mainBoardsIdObj.map(async (board, index) => {
    const boardId = board.boardId;
    const paramToGetUsernameIds = {
      boardId,
      key,
      token,
    };
    const memberDetails = await getMemberId(paramToGetUsernameIds);

    return memberDetails;
  });

  return res.status(200).json({ allMembersDetails: mainBoardsIdObj });
}

exports.findMemberId = findMemberId;
