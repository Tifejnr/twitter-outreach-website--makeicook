const axios = require("axios");

async function getMemberId(memberUsername, boardId) {
  const boardsDetailsUrl = `https://api.trello.com/1/boards/${boardId}/members?key=${key}&token=${token}`;
  try {
    // Fetch list of members on the board
    const response = await axios.get(boardsDetailsUrl);
    const members = response.data;

    // Search for the desired member by username
    const desiredMember = members.find(
      (member) => member.username === memberUsername
    );

    if (!desiredMember) return { usernameNotFound: true };

    const memberId = desiredMember.id;
    return { memberId };
  } catch (error) {
    console.error("Error:", error);
    return { boardDetailsFetchingError: error };
  }
}

exports.getMemberId = getMemberId;
