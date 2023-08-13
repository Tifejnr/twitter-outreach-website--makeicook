const axios = require("axios");

//delete memeber from boards
async function deleteMemberFromBoard(req, res) {
  const { boardId, memberId } = req.body;

  const boardDeleteUrl = `
  https://api.trello.com/1/boards/${boardId}/members/${memberId}?key=${key}&token=${token}`;

  try {
    const response = await axios.delete(boardDeleteUrl);
    const data = await response.statusText;
    const deleteSucessfull = await data;

    if (deleteSucessfull == "OK")
      return res.status(200).json({ deleteSucessfull });
  } catch (error) {
    console.error("Error:", error);
    const memberNotFoundError = error.response.data;

    if (memberNotFoundError == "membership not found")
      return res.status(401).json({ memberNotFoundError });
    res.status(500).json({ error });
  }
}

exports.deleteMemberFromBoard = deleteMemberFromBoard;
