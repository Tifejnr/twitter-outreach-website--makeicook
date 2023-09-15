const axios = require("axios");

async function getUserDetails(key, token) {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/members/me?fields=fullName,username,email&key=${key}&token=${token}`
    );

    if (response.status === 200) {
      const data = response.data;
      if (data) return data;
    } else {
      console.log(
        `Failed to get Trello information. Status code: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

exports.getUserDetails = getUserDetails;
