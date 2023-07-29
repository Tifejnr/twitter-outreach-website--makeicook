const { user } = require("../../models/users");
module.exports = async function (req, res, next) {
  try {
    //check if user has trello token stored or iv
    // const userId = userDetails._id;
    const userId = "64ad80b631825676a3fcec77";
    const accountUser = await user.findById(userId);
    const isAuthorized = accountUser.iv;

    if (isAuthorized == "NA")
      return res.status(402).json({ backToOauthPage: true });

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ trelloTokenNotFoundError: error });
  }
};
