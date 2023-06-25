const { getKeys } = require("../../envKeys/allKeys");

const keysObj = getKeys();
const key = process.env.CLIENT_SECRET_KEY;
const token = keysObj.ACCESS_TOKEN_SECRET;

async function addMemberToBoard(req, res) {
  const { boardId, email } = req.body;
  const memberAddingUrl = `https://api.trello.com/1/boards/${boardId}/members`;

  const params = {
    email,
    key,
    token,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };

  try {
    const response = await fetch(memberAddingUrl, options);
    if (response.ok && response.status == 200) {
      console.log("Member added successfully");
      const success = true;
      res.status(200).json({ success });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error });
  }
}

exports.addMemberToBoard = addMemberToBoard;
