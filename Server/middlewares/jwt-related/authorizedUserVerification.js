const { user } = require("../../models/users");
const {
  decryptExtensionKey,
} = require("../extensionKey-safety/decryptExtensionKey");

module.exports = async function (req, res, next) {
  try {
    //check if user has trello token stored or iv
    const userId = userDetails._id;
    const accountUser = await user.findById(userId);
    const isAuthorized = accountUser.iv;
    userCredits = accountUser.credits;

    const extensionKey = await decryptExtensionKey(userId);
    extensionLoginDetails = {
      email: accountUser.email,
      extensionKey,
    };

    if (isAuthorized == "NA")
      return res.status(402).json({ backToOauthPage: true });

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ trelloTokenNotFoundError: error });
  }
};
