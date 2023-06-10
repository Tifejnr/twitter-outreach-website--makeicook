const axios = require("axios");

async function deleteMemberFromBoard(req, res) {
  const { boardId, username } = req.body;

  console.log(req.body);
  const key = "3871b737b5e006da43d0e48f6d8f68ee";
  const token =
    "688f89f00f6103cb099e8413af68ccd5ae446c869875aae282b5b5efafbb3c6d";
  const boardDetailsFetchUrl = `https://api.trello.com/1/boards/${boardId}/members?&key=${key}&token=${token}`;

  try {
    const response = await axios.get(boardDetailsFetchUrl);
    const boardDetails = response.data;

    console.log(boardDetails);

    res.status(200).json({ boardDetails });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error });
  }
}

// // Function to find object by username
// function findUserByUsername(username) {
//   return users.find((user) => user.username === username);
// }

// // Usage example
// const usernameToFind = "jane_smith";
// const foundUser = findUserByUsername(usernameToFind);

// if (foundUser) {
//   console.log("User found:", foundUser);
// } else {
//   console.log("User not found");
// }

exports.deleteMemberFromBoard = deleteMemberFromBoard;
