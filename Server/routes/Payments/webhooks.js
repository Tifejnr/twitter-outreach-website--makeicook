//Lemon squuezy payment checkou url getting
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const router = express.Router();
const { getKeys } = require("../../envKeys/allKeys");

const keysObjects = getKeys();
const secret = keysObjects.webHookSecret;

// Endpoint to handle incoming webhook events
router.post("/", async (req, res) => {
  let rawData = "";
  req.on("data", (chunk) => {
    // Accumulate the raw data chunks
    rawData += chunk;
  });

  req.on("end", () => {
    // rawData now contains the complete raw data from the request
    console.log("Raw Data:", rawData);
    if (!rawData) return console.log("rawData  does not exist");

    console.log(rawData);

    if (!secret) return console.log("secret  does not exist");

    try {
      const headerSignarture = Buffer.from(
        req.get("X-Signature") || "",
        "utf8"
      );

      // Verify the signature
      const hmac = crypto.createHmac("sha256", secret);
      const generatedSigFromBody = Buffer.from(
        hmac.update(rawData).digest("hex"),
        "utf8"
      );

      console.log(" headerSignarture ", headerSignarture.length);
      console.log("generatedSigFromBody", generatedSigFromBody.length);

      if (!crypto.timingSafeEqual(generatedSigFromBody, headerSignarture)) {
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
    } catch (error) {
      console.log(error);
    }
  });
});

module.exports = router;

`Farhad is a seriously talented developer. He delivered like a wizard, his communication was top-notch, lightning fast responsiveness, he delivered way before the deadline, was willing to go the extra mile and his skills were reasonably strong.. Clean code, amazing results, FAST.  Very pleased with his work and I can't recommend him highly enough. If Farhad bids on your project, look no further. You've found your guy.`;
