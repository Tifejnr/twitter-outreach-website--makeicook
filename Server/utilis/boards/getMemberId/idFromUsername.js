const { getMemberId } = require("./getMembersId");

async function findMemberId(req, res) {
  const memberIdFound = [];
  const { memberUsername, boardIdsObj } = req.body;

  console.log(memberUsername);

  const mainBoardsIdObj = boardIdsObj.boardsIdOnly;

  // Create an array to hold promises
  const promises = mainBoardsIdObj.map(async (board, index) => {
    const boardId = board.boardId;
    const paramToGetUsernameIds = { boardId, memberUsername, key, token };

    try {
      const isMemberPresent = await getMemberId(paramToGetUsernameIds);

      if (isMemberPresent && isMemberPresent.memberId) {
        memberIdFound.push(isMemberPresent);
      }
    } catch (error) {
      console.log("error", error);
    }
  });

  // Wait for all promises to resolve
  await Promise.all(promises);
  console.log(memberIdFound.length);

  if (memberIdFound.length > 0) return res.status(200).json({ memberIdFound });

  return res.status(402).json({ usernameIdNotFound: true });
}

exports.findMemberId = findMemberId;
