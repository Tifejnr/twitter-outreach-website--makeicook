//Lemon squuezy payment checkou url getting
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const router = express.Router();
const { getKeys } = require("../../envKeys/allKeys");
// const { retrieveStore, listAllStores } = require("lemonsqueezy.ts/store");
// const { retrieveVariant, listAllVariants } = require("lemonsqueezy.ts/variant");

// Middleware to store the raw request body in req.rawBody
router.use((req, res, next) => {
  let data = "";
  req.setEncoding("utf8");
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    req.rawBody = data;
    console.log(req.rawBody);
    next();
  });
});

const keysObjects = getKeys();
const secret = keysObjects.webHookSecret;

// Endpoint to handle incoming webhook events
router.post("/", (req, res) => {
  console.log("yeahaaaaaaaaaaaaaaaaaaaa");
  const signature = Buffer.from(req.get("X-Signature") || "", "utf8");

  // Verify the signature
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(req.rawBody).digest("hex"), "utf8");

  if (!crypto.timingSafeEqual(digest, signature)) {
    console.log("invalid signature ma g");
    // Invalid signature
    return res.status(403).json({ error: "Invalid signature." });
  }
  // Signature is valid, process the webhook event
  const { event, data } = req.body;
  if (event === "order_created") {
    // Handle the successful order payment event
    // You can perform any actions you want here, such as updating your database, sending notifications, etc.
    console.log("Received successful order payment event:", data);
    // Respond with a 200 status to acknowledge receipt of the webhook
    return res.sendStatus(200);
  } else {
    // For other events, respond with a 204 status to indicate that the event is not handled by this endpoint
    return res.sendStatus(204);
  }
});

module.exports = router;
