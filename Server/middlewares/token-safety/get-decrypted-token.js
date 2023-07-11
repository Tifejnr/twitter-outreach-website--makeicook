const { decryptToken } = require("./decryptToken");
const { user } = require("../../models/users");

async function getDecryptedToken(userDetails) {
  try {
    const accountUser = await user.findById(userDetails._id);
    const token = await decryptToken(accountUser.trello_token);

    if (token) return token;
  } catch (error) {
    console.log(error);
    return false;
  }
}

exports.getDecryptedToken = getDecryptedToken;
