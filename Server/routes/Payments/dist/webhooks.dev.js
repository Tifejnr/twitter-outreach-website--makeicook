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

router.post("/", function _callee(req, res) {
  var signature, hmac, digest, _req$body, event, data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          signature = Buffer.from(req.get("X-Signature") || "", "utf8"); // Verify the signature

          hmac = crypto.createHmac("sha256", secret);
          digest = Buffer.from("sha256" + "=" + hmac.update(req.rawBody).digest("hex"), "utf8");

          if (!(!signature.length !== digest.length || !crypto.timingSafeEqual(digest, signature))) {
            _context.next = 7;
            break;
          }

          console.log("invalid signature ma g"); // Invalid signature

          return _context.abrupt("return", res.status(403).json({
            error: "Invalid signature."
          }));

        case 7:
          // if (!crypto.timingSafeEqual(digest, signature)) {
          //   console.log("invalid signature ma g");
          //   throw new Error("Invalid signature.");
          //   // Invalid signature
          //   return res.status(403).json({ error: "Invalid signature." });
          // }
          // Signature is valid, process the webhook event
          _req$body = req.body, event = _req$body.event, data = _req$body.data;

          if (!(event === "order_created")) {
            _context.next = 13;
            break;
          }

          // Handle the successful order payment event
          // You can perform any actions you want here, such as updating your database, sending notifications, etc.
          console.log("Received successful order payment event:", data); // Respond with a 200 status to acknowledge receipt of the webhook

          return _context.abrupt("return", res.sendStatus(200));

        case 13:
          return _context.abrupt("return", res.sendStatus(204));

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
module.exports = router;