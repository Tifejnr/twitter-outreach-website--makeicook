"use strict";

//Lemon squuezy payment checkou url getting
var express = require("express");

var bodyParser = require("body-parser");

var crypto = require("crypto");

var router = express.Router();

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys;

var keysObjects = getKeys();
var secret = keysObjects.webHookSecret;
var sigHeaderName = "X-Signature";
var sigHashAlg = "sha256"; // Use express.raw() middleware to capture the raw request body

router.use(express.raw({
  type: "*/*"
})); // Middleware to store the raw request body in req.rawBody

router.use(bodyParser.json({
  verify: function verify(req, res, buf, encoding) {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || "utf8");
      console.log(req.rawBody);
    }
  }
})); // Endpoint to handle incoming webhook events

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

          return _context.abrupt("return", console.log(" req.body not found"));

        case 2:
          _context.prev = 2;
          signature = Buffer.from(req.get(sigHeaderName) || "", "utf8"); // Verify the signature

          hmac = crypto.createHmac(sigHashAlg, secret);
          digest = Buffer.from(sigHashAlg + "=" + hmac.update(req.rawBody).digest("hex"), "utf8");

          if (!(!signature.length !== digest.length || !crypto.timingSafeEqual(digest, signature))) {
            _context.next = 9;
            break;
          }

          console.log("invalid signature ma g"); // Invalid signature

          return _context.abrupt("return", res.status(403).json({
            error: "Invalid signature."
          }));

        case 9:
          // Signature is valid, process the webhook event
          _req$body = req.body, event = _req$body.event, data = _req$body.data;

          if (!(event === "order_created")) {
            _context.next = 15;
            break;
          }

          // Handle the successful order payment event
          // You can perform any actions you want here, such as updating your database, sending notifications, etc.
          console.log("Received successful order payment event:", data); // Respond with a 200 status to acknowledge receipt of the webhook

          return _context.abrupt("return", res.sendStatus(200));

        case 15:
          return _context.abrupt("return", res.sendStatus(204));

        case 16:
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 18]]);
});
module.exports = router;