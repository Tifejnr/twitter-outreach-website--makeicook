const axios = require("axios");

async function getMemberId(req, res) {
  const { memberUsername, boardId } = req.body;

  const boardsDetailsUrl = `https://api.trello.com/1/boards/${boardId}/members?key=${key}&token=${token}`;
  try {
    // Fetch list of members on the board
    const response = await axios.get(boardsDetailsUrl);
    const members = response.data;

    // Search for the desired member by username
    const desiredMember = members.find(
      (member) => member.username === memberUsername
    );

    if (!desiredMember) return res.status(402).json({ usernameNotFound: true });

    const memberId = desiredMember.id;
    return res.status(200).json({ memberId });
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ boardDetailsFetchingError: error });
  }
}

exports.getMemberId = getMemberId;
