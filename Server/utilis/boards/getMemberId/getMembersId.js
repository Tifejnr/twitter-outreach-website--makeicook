const axios = require("axios");

async function getMemberId(paramToGetUsernameIds) {
  const boardId = paramToGetUsernameIds.boardId;
  const memberUsername = paramToGetUsernameIds.memberUsername;
  const key = paramToGetUsernameIds.key;
  const token = paramToGetUsernameIds.token;
  const isUsernameInput = paramToGetUsernameIds.isUsernameInput;
  let desiredMember;

  const boardsDetailsUrl = `https://api.trello.com/1/boards/${boardId}/members?key=${key}&token=${token}`;
  try {
    // Fetch list of members on the board
    const response = await axios.get(boardsDetailsUrl);
    const boardMembersDetails = response.data;

    // if (isUsernameInput) {
    //   // Search for the desired member by username
    //   desiredMember = boardMembersDetails.find(
    //     (member) => member.username === memberUsername
    //   );
    // } else {
    //   desiredMember = boardMembersDetails.find(
    //     (member) => member.fullName === memberUsername
    //   );
    // }

    // if (!desiredMember) return;

    // const memberId = desiredMember.id;
    return boardMembersDetails;
  } catch (error) {
    console.error("Error:", error);
    return { boardDetailsFetchingError: error };
  }
}

exports.getMemberId = getMemberId;
