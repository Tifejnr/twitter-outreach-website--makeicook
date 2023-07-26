"use strict";

//Lemon squuezy payment checkou url getting
var express = require("express");

var bodyParser = require("body-parser");

var crypto = require("crypto");

var router = express.Router();

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys;

var keysObjects = getKeys();
var secret = keysObjects.webHookSecret; // Use express.raw() middleware to capture the raw request body

router.use(express.raw({
  type: "*/*"
})); // Middleware to store the raw request body in req.rawBody

router.use(function (req, res, next) {
  req.rawBody = req.body.toString("utf8");
  console.log(req.rawBody);
  next();
});
router.use(bodyParser.json()); // Endpoint to handle incoming webhook events

router.post("/", function (req, res) {
  console.log(req.rawBody);
  console.log(secret);

  try {
    var signature = Buffer.from(req.get("X-Signature") || "", "utf8"); // Verify the signature

    var hmac = crypto.createHmac("sha256", secret);
    var digest = Buffer.from(hmac.update(req.rawBody).digest("hex"), "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      console.log("invalid signature ma g"); // Invalid signature

      return res.status(403).json({
        error: "Invalid signature."
      });
    } // Signature is valid, process the webhook event


    var _req$body = req.body,
        event = _req$body.event,
        data = _req$body.data;

    if (event === "order_created") {
      // Handle the successful order payment event
      // You can perform any actions you want here, such as updating your database, sending notifications, etc.
      console.log("Received successful order payment event:", data); // Respond with a 200 status to acknowledge receipt of the webhook

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