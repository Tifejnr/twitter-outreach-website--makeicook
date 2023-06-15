const axios = require("axios");
require("dotenv").config();

//fetching env variables
const key = process.env.CLIENT_SECRET_KEY;
const token = process.env.ACCESS_TOKEN_SECRET;

async function deleteExecution(boardId, memberId) {
  const boardDeleteUrl = `
  https://api.trello.com/1/boards/${boardId}/members/${memberId}?key=${key}&token=${token}`;

  try {
    const response = await axios.delete(boardDeleteUrl);
    const data = await response.statusText;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

exports.deleteExecution = deleteExecution;
