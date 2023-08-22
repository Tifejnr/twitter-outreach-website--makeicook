const axios = require("axios");

async function getMemberId(paramToGetUsernameIds) {
  const boardId = paramToGetUsernameIds.boardId;
  const key = paramToGetUsernameIds.key;
  const token = paramToGetUsernameIds.token;

  const boardsDetailsUrl = `https://api.trello.com/1/boards/${boardId}/members?key=${key}&token=${token}`;
  try {
    // Fetch list of members on the board
    const response = await axios.get(boardsDetailsUrl);
    let boardMembersDetails = response.data;
    return { boardMembersDetails, boardId };
  } catch (error) {
    console.error("Error:", error);
    return { boardDetailsFetchingError: error };
  }
}

exports.getMemberId = getMemberId;
