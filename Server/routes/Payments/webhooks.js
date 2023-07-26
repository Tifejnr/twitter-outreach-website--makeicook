//Lemon squuezy payment checkou url getting
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const router = express.Router();
const { getKeys } = require("../../envKeys/allKeys");

const keysObjects = getKeys();
const secret = keysObjects.webHookSecret;

// Custom middleware to capture the raw request body before parsing it
router.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

// Endpoint to handle incoming webhook events
router.post("/", async (req, res) => {
  if (!req.rawBody) return console.log(" req.rawBody  does not exist");

  try {
    const headerSignarture = Buffer.from(req.get("X-Signature") || "", "utf8");

    // Verify the signature
    const hmac = crypto.createHmac("sha256", secret);
    const generatedSigFromBody = Buffer.from(
      hmac.update(req.rawBody).digest("hex"),
      "utf8"
    );

    if (!crypto.timingSafeEqual(generatedSigFromBody, headerSignarture))
      return res.status(403).json({ error: "Invalid signature." });
    // Signature is valid, process the webhook event

    console.log(req.body);
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

module.exports = router;

`Farhad is a seriously talented developer. He delivered like a wizard, his communication was top-notch, lightning fast responsiveness, he delivered way before the deadline, was willing to go the extra mile and his skills were reasonably strong.. Clean code, amazing results, FAST.  Very pleased with his work and I can't recommend him highly enough. If Farhad bids on your project, look no further. You've found your guy.`;
