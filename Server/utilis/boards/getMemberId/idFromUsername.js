const { getMemberId } = require("./getMembersId");
const additionAction = "Addition";

async function findMemberId(req, res) {
  const { allBoardsId } = req.body;

  const mainBoardsIdObj = allBoardsId.boardsIdOnly;
  // Create an array to hold promises so that all promises are executed before moving on with the process
  const allMembersDetails = await Promise.all(
    mainBoardsIdObj.map(async (board) => {
      const boardId = board.boardId;
      const paramToGetUsernameIds = {
        boardId,
        key,
        token,
      };
      const memberDetails = await getMemberId(paramToGetUsernameIds);
      return memberDetails;
    })
  );

  console.log(allMembersDetails);
  return res.status(200).json({ allMembersDetails });
}

exports.findMemberId = findMemberId;
