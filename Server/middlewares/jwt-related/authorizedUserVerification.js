const { user } = require("../../models/users");
module.exports = async function (req, res, next) {
  try {
    //check if user has trello token stored or iv
    const accountUser = await user.findById(userDetails._id);
    const isAuthorized = accountUser.iv;

    if (isAuthorized) return res.status(401).json({ backToOauthPage: true });

    next();
  } catch (ex) {
    console.log(ex);
    res.status(400).json({ unauthorizedToken: true });
  }
};
