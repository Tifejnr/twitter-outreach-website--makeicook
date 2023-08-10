const { getMemberId } = require("./getMembersId");

function findMemberId(req, res) {
  let memberIdFound = [];
  const { memberUsername, boardIdsObj } = req.body;

  //to remove @ symbol from
  const desiredUsername = memberUsername.slice(1);

  const mainBoardsIdObj = boardIdsObj.boardsIdOnly;

  const memberId = mainBoardsIdObj.forEach(async (board, index) => {
    const boardId = board.boardId;
    const paramToGetUsernameIds = { boardId, desiredUsername, key, token };

    try {
      const isMemberPresent = await getMemberId(paramToGetUsernameIds);

      if (!isMemberPresent) return console.log("username not found");
      if (isMemberPresent.memberId)
        return memberIdFound.push(isMemberPresent.memberId);
    } catch (error) {
      console.log(error);
    }
  });

  if (memberIdFound.length > 0) return res.status(200).json({ memberIdFound });

  return res.status(400).json({ usernameNotFound: true });
}

exports.findMemberId = findMemberId;
