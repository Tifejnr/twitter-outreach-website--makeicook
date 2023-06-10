const axios = require("axios");

async function deleteExecution(boardId, memberId) {
  const key = "3871b737b5e006da43d0e48f6d8f68ee";
  const token =
    "688f89f00f6103cb099e8413af68ccd5ae446c869875aae282b5b5efafbb3c6d";
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
