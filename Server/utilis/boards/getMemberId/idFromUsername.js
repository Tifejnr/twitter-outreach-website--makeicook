const { getMemberId } = require("./getMembersId");

function findMemberId(req, res) {
  console.log(req.body);
  const { memberUsername, boardCollection } = req.body;

  const memberId = boardCollection.map(async (board, index) => {
    const boardId = board.id;
    const isMemberPresent = await getMemberId(memberUsername, boardId);

    if (isMemberPresent.memberId) return { isMemberPresent };

    return false;
  });

  console.log(memberId);
}

exports.findMemberId = findMemberId;
