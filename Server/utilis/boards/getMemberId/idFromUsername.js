const { getMemberId } = require("./getMembersId");

function findMemberId(req, res) {
  const { memberUsername, boardIdsObj } = req.body;

  const mainBoardsIdObj = boardIdsObj.boardsIdOnly;

  const memberId = mainBoardsIdObj.map(async (board, index) => {
    const boardId = board.boardId;
    const paramToGetUsernameIds = { boardId, memberUsername, key, token };

    try {
      const isMemberPresent = await getMemberId(paramToGetUsernameIds);

      if (isMemberPresent.memberId) return { isMemberPresent };

      return false;
    } catch (error) {
      console.log(error);
    }
  });

  console.log(memberId);

  // let memberUsernameFound = [];
  // const inputs = input.split(/\s*,\s*/);

  // mainBoardsIdObj.forEach(async(board, index) => {
  //   const boardId = board.boardId;
  //   //push to array of failed validation if invalid
  //   if (!regex.test(input)) {
  //     memberUsernameFound.push(index);
  //   }
  // });

  // if (memberUsernameFound.length > 0) return { memberUsernameFound };

  // return { usernamesValidationSucess: true };
}

exports.findMemberId = findMemberId;
