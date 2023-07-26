//Lemon squuezy payment checkou url getting
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const { user } = require("../../models/users");
const router = express.Router();
const { getKeys } = require("../../envKeys/allKeys");

const keysObjects = getKeys();
const secret = keysObjects.webHookSecret;

const orderCreatedEvent = "order_created";

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

    //destructuring data sent to get needed details
    const { data, meta } = req.body;
    const { event_name, custom_data } = meta;
    const { user_id } = custom_data;

    if (event_name === orderCreatedEvent) {
      const accountUser = await user.findById(user_id);
      if (!accountUser) return res.status(400).json({ invalid_User: true });

      //destructuring data sent to get payment details
      const { status_formatted, first_order_item } = data;
      const { product_name } = first_order_item;

      if (!status_formatted != "Paid") return res.sendStatus(204);
      accountUser.isPaid = true;

      accountUser.credits = 460;

      console.log(accountUser);

      // Handle the successful order payment event
      // You can perform any actions you want here, such as updating your database, sending notifications, etc.
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
