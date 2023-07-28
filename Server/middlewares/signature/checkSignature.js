const { user } = require("../models/users");
const creditsNoPerAction = 1;

module.exports = async function (req, res, next) {
  const { clientSignature } = req.body;
  try {
    if (creditsAvailable < 1)
      return res.status(402).json({ insufficientCredits: true });

    if (!clientSignature === serverSignature) {
      const userId = userDetails._id;
      // const userId = "64ad80b631825676a3fcec77";
      const accountUser = await user.findById(userId);

      console.log(accountUser.credits);

      const remainingCredits = accountUser.credits - creditsNoPerAction;

      accountUser.credits = remainingCredits;

      await accountUser.save();

      console.log(accountUser.credits);
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ somethingWentWrong: true });
    return false;
  }
};
