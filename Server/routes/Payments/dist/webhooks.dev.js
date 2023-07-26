"use strict";

//Lemon squuezy payment checkou url getting
var express = require("express");

var bodyParser = require("body-parser");

var crypto = require("crypto");

var router = express.Router();

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys;

var keysObjects = getKeys();
var secret = keysObjects.webHookSecret; // Endpoint to handle incoming webhook events

router.post("/", express.raw({
  type: "*/*"
}), function _callee(req, res) {
  var rawBody, myObject, headerSignarture, hmac, generatedSigFromBody, _req$body, event, data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          rawBody = req.body.toString();

          if (rawBody) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", console.log("rawBody  does not exist"));

        case 3:
          myObject = rawBody;
          console.log(myObject.key);
          console.log(rawBody);

          if (secret) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", console.log("secret  does not exist"));

        case 8:
          _context.prev = 8;
          headerSignarture = Buffer.from(req.get("X-Signature") || "", "utf8"); // Verify the signature

          hmac = crypto.createHmac("sha256", secret);
          generatedSigFromBody = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
          console.log(" headerSignarture ", headerSignarture.length);
          console.log("generatedSigFromBody", generatedSigFromBody.length);

          if (crypto.timingSafeEqual(generatedSigFromBody, headerSignarture)) {
            _context.next = 17;
            break;
          }

          console.log("invalid signature ma g"); // Invalid signature

          return _context.abrupt("return", res.status(403).json({
            error: "Invalid signature."
          }));

        case 17:
          // Signature is valid, process the webhook event
          _req$body = req.body, event = _req$body.event, data = _req$body.data;

          if (!(event === "order_created")) {
            _context.next = 23;
            break;
          }

          // Handle the successful order payment event
          // You can perform any actions you want here, such as updating your database, sending notifications, etc.
          console.log("Received successful order payment event:", data); // Respond with a 200 status to acknowledge receipt of the webhook

          return _context.abrupt("return", res.sendStatus(200));

        case 23:
          return _context.abrupt("return", res.sendStatus(204));

        case 24:
          _context.next = 29;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](8);
          console.log(_context.t0);

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 26]]);
});
module.exports = router;