const axios = require("axios");

let addingUrl;

async function addMemberToBoard(req, res) {
  const { email, memberId, boardId } = req.body;

  const memberIdAddingUrl = `https://api.trello.com/1/boards/${boardId}/members/${memberId}?type={type}&key=${key}&token=${token}`;
  const memberEmailAddingUrl = `https://api.trello.com/1/boards/${boardId}/members?email=${email}&key=${key}&token=${token}`;

  if (email) {
    addingUrl = memberEmailAddingUrl;
  }
  if (memberId) {
    addingUrl = memberIdAddingUrl;
  }

  try {
    const response = await axios.put(addingUrl);

    if (response.status === 200) {
      console.log("Member added successfully");
      const success = true;
      return res.status(200).json({ success });
    }
  } catch (error) {
    console.error("Error:", error);
    console.error(error.message);

    res.status(400).json({ error });
  }
}

exports.addMemberToBoard = addMemberToBoard;
