const axios = require("axios");

async function getMemberId(paramToGetUsernameIds) {
  const boardId = paramToGetUsernameIds.boardId;
  const desiredUsername = paramToGetUsernameIds.desiredUsername;
  const key = paramToGetUsernameIds.key;
  const token = paramToGetUsernameIds.token;

  const boardsDetailsUrl = `https://api.trello.com/1/boards/${boardId}/members?key=${key}&token=${token}`;
  try {
    // Fetch list of members on the board
    const response = await axios.get(boardsDetailsUrl);
    const boardMembersDetails = response.data;

    // Search for the desired member by username
    const desiredMember = boardMembersDetails.find(
      (member) => member.username === desiredUsername
    );

    if (!desiredMember) return;

    const memberId = desiredMember.id;
    console.log(memberId);
    return { memberId };
  } catch (error) {
    console.error("Error:", error);
    return { boardDetailsFetchingError: error };
  }
}

exports.getMemberId = getMemberId;
