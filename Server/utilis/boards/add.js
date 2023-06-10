async function addMemberToBoard(req, res) {
  const { boardId, email } = req.body;
  const key = "3871b737b5e006da43d0e48f6d8f68ee";
  const memberAddingUrl = `https://api.trello.com/1/boards/${boardId}/members`;
  const token =
    "688f89f00f6103cb099e8413af68ccd5ae446c869875aae282b5b5efafbb3c6d";

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
