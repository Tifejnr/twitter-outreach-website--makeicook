const express = require("express");
const router = express.Router();
const { signJwt } = require("../utilis/JWT/sign-jwt");
router.post("/", async (req, res) => {
  const jwtToken = await signJwt();
  res
    .cookie("xAuth", token, {
      maxAge: 1209600000,
      httpOnly: true,
      secure: true,
    })
    .send(finalResult);
});

module.exports = router;
