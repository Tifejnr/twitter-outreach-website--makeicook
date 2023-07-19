const axios = require("axios");

async function fetchAllBoards(req, res) {
  const token =
    "688f89f00f6103cb099e8413af68ccd5ae446c869875aae282b5b5efafbb3c6d";

  const key = "3871b737b5e006da43d0e48f6d8f68ee";
  const boardsFetchingUrl = `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`;

  try {
    const response = await axios.get(boardsFetchingUrl);
    const boards = response.data;

    res.status(200).json({ boards });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error });
  }
}

exports.fetchAllBoards = fetchAllBoards;
