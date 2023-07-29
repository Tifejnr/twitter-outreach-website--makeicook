const { user } = require("../models/users");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  //   const { error } = validateSignInParams(req.body);

  //   if (error)
  //     return res.status(400).json({ joiError: error.details[0].message });

  try {
    // const userId = userDetails._id;
    const userId = "64ad80b631825676a3fcec77";
    const accountUser = await user.findById(userId);

    console.log(accountUser);

    res.status(200).json({ accountUser });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

module.exports = router;
