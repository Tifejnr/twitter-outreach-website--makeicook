"use strict";

//Lemon squuezy payment checkou url getting
var express = require("express");

var bodyParser = require("body-parser");

var crypto = require("crypto");

var router = express.Router();

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys;

var keysObjects = getKeys();
var secret = keysObjects.webHookSecret; // Middleware to parse JSON data

router.use(bodyParser.json()); // Custom middleware to store raw JSON data in req.rawBody

router.use(function (req, res, next) {
  req.rawBody = JSON.stringify(req.body);
  console.log(req.rawBody);
  next();
}); // Endpoint to handle incoming webhook events

router.post("/", function _callee(req, res) {
  var signature, hmac, digest, _req$body, event, data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.rawBody) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", console.log("req.rawBody does not exist"));

        case 2:
          console.log(req.rawBody);
          _context.prev = 3;
          signature = Buffer.from(req.get("X-Signature") || "", "utf8"); // Verify the signature

          hmac = crypto.createHmac("sha256", secret);
          digest = Buffer.from(hmac.update(req.rawBody).digest("hex"), "utf8");

          if (crypto.timingSafeEqual(digest, signature)) {
            _context.next = 10;
            break;
          }

          console.log("invalid signature ma g"); // Invalid signature

          return _context.abrupt("return", res.status(403).json({
            error: "Invalid signature."
          }));

        case 10:
          // Signature is valid, process the webhook event
          _req$body = req.body, event = _req$body.event, data = _req$body.data;

          if (!(event === "order_created")) {
            _context.next = 16;
            break;
          }

          // Handle the successful order payment event
          // You can perform any actions you want here, such as updating your database, sending notifications, etc.
          console.log("Received successful order payment event:", data); // Respond with a 200 status to acknowledge receipt of the webhook

          return _context.abrupt("return", res.sendStatus(200));

        case 16:
          return _context.abrupt("return", res.sendStatus(204));

        case 17:
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 19]]);
});
module.exports = router;