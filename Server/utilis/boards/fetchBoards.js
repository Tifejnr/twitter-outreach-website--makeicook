const axios = require("axios");
const { getKeys } = require("../../envKeys/allKeys");
const keysObjects = getKeys();

const key = keysObjects.CLIENT_SECRET_KEY;
const token = keysObjects.ACCESS_TOKEN_SECRET;

async function fetchAllBoards(req, res) {
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
