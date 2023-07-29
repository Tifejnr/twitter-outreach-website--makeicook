const axios = require("axios");
const { user } = require("../../models/users");
const {
  generateSignature,
} = require("../../middlewares/signature/generateSignature");

// const { getKeys } = require("../../envKeys/allKeys");
// const keysObjects = getKeys();

// const key = keysObjects.CLIENT_SECRET_KEY;
// const token = keysObjects.ACCESS_TOKEN_SECRET;

async function fetchAllBoards(req, res) {
  const userId = userDetails._id;
  // const userId = "64ad80b631825676a3fcec77";
  const accountUser = await user.findById(userId);
  const sessionSignature = generateSignature();

  //save user signature on every page load
  accountUser.sessionSignature = sessionSignature;
  await accountUser.save();

  //fetch all boards
  const boardsFetchingUrl = `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`;

  try {
    const response = await axios.get(boardsFetchingUrl);
    const boards = response.data;

    res.status(200).json({ boards, sessionSignature });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error });
  }
}

exports.fetchAllBoards = fetchAllBoards;
