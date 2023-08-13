const { getMemberId } = require("./getMembersId");
const additionAction = "Addition";

async function findMemberId(req, res) {
  const {
    memberUsername,
    isUsernameInput,
    boardIdsObj,
    checkedBoardsObj,
    action,
  } = req.body;

  let noOfAttemptsArray = [],
    memberIdFound = [],
    boardObjToSearch;

  const mainBoardsIdObj = boardIdsObj.boardsIdOnly;

  if (action == additionAction) {
    boardObjToSearch = mainBoardsIdObj;
  } else {
    boardObjToSearch = checkedBoardsObj;
  }

  for (const board of boardObjToSearch) {
    noOfAttemptsArray.push(1);
    if (memberIdFound.length > 0) {
      console.log("already found it,", noOfAttemptsArray.length);
      break;
    }

    const boardId = board.boardId;
    const paramToGetUsernameIds = {
      boardId,
      memberUsername,
      isUsernameInput,
      key,
      token,
    };

    try {
      const isMemberPresent = await getMemberId(paramToGetUsernameIds);

      if (isMemberPresent && isMemberPresent.memberId) {
        memberIdFound.push(isMemberPresent);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  if (memberIdFound.length > 0) {
    return res.status(200).json({ memberIdFound });
  }

  if (
    noOfAttemptsArray.length === mainBoardsIdObj.length &&
    memberIdFound.length === 0
  ) {
    return res.status(402).json({ usernameIdNotFound: true });
  }
}

exports.findMemberId = findMemberId;
