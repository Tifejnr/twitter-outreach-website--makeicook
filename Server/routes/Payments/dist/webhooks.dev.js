"use strict";

//Lemon squuezy payment checkou url getting
var express = require("express");

var axios = require("axios");

var crypto = require("crypto");

var router = express.Router();

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys; // const { retrieveStore, listAllStores } = require("lemonsqueezy.ts/store");
// const { retrieveVariant, listAllVariants } = require("lemonsqueezy.ts/variant");
// Middleware to store the raw request body in req.rawBody


router.use(function (req, res, next) {
  var data = "";
  req.setEncoding("utf8");
  req.on("data", function (chunk) {
    data += chunk;
  });
  req.on("end", function () {
    req.rawBody = data;
    console.log(req.rawBody);
    next();
  });
});
var keysObjects = getKeys();
var secret = keysObjects.webHookSecret; // Endpoint to handle incoming webhook events

router.post("/", function (req, res) {
  console.log("yeahaaaaaaaaaaaaaaaaaaaa");
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
});
module.exports = router;