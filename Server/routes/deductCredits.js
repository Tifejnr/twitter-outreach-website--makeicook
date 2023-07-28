const { user } = require("../models/users");
const express = require("express");
const router = express.Router();

const creditsNoPerAction = 1;

router.post("/", async (req, res) => {
  try {
    const userId = userDetails._id;
    // const userId = "64ad80b631825676a3fcec77";
    const accountUser = await user.findById(userId);

    const remainingCredits = accountUser.credits - creditsNoPerAction;

    accountUser.credits = remainingCredits;

    await accountUser.save();

    res.status(200).json({ accountUser });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

module.exports = router;
