"use strict";

//Lemon squuezy payment checkou url getting
var express = require("express");

var bodyParser = require("body-parser");

var crypto = require("crypto");

var router = express.Router();

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys;

var keysObjects = getKeys();
var secret = keysObjects.webHookSecret; // Custom middleware to capture the raw request body before parsing it

router.use(bodyParser.json({
  verify: function verify(req, res, buf) {
    req.rawBody = buf.toString();
  }
})); // Endpoint to handle incoming webhook events

router.post("/", function _callee(req, res) {
  var headerSignarture, hmac, generatedSigFromBody, _req$body, event, data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.rawBody);

          if (req.rawBody) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", console.log(" req.rawBody  does not exist"));

        case 3:
          console.log(req.rawBody);

          if (secret) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", console.log("secret  does not exist"));

        case 6:
          _context.prev = 6;
          headerSignarture = Buffer.from(req.get("X-Signature") || "", "utf8"); // Verify the signature

          hmac = crypto.createHmac("sha256", secret);
          generatedSigFromBody = Buffer.from(hmac.update(req.rawBody).digest("hex"), "utf8");
          console.log(" headerSignarture ", headerSignarture.length);
          console.log("generatedSigFromBody", generatedSigFromBody.length);

          if (crypto.timingSafeEqual(generatedSigFromBody, headerSignarture)) {
            _context.next = 15;
            break;
          }

          console.log("invalid signature ma g"); // Invalid signature

          return _context.abrupt("return", res.status(403).json({
            error: "Invalid signature."
          }));

        case 15:
          // Signature is valid, process the webhook event
          _req$body = req.body, event = _req$body.event, data = _req$body.data;

          if (!(event === "order_created")) {
            _context.next = 21;
            break;
          }

          // Handle the successful order payment event
          // You can perform any actions you want here, such as updating your database, sending notifications, etc.
          console.log("Received successful order payment event:", data); // Respond with a 200 status to acknowledge receipt of the webhook

          return _context.abrupt("return", res.sendStatus(200));

        case 21:
          return _context.abrupt("return", res.sendStatus(204));

        case 22:
          _context.next = 27;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](6);
          console.log(_context.t0);

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 24]]);
});
module.exports = router;
"Farhad is a seriously talented developer. He delivered like a wizard, his communication was top-notch, lightning fast responsiveness, he delivered way before the deadline, was willing to go the extra mile and his skills were reasonably strong.. Clean code, amazing results, FAST.  Very pleased with his work and I can't recommend him highly enough. If Farhad bids on your project, look no further. You've found your guy.";