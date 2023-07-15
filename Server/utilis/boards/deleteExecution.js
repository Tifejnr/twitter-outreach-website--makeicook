const axios = require("axios");

async function deleteExecution(boardId, memberId, token) {
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
