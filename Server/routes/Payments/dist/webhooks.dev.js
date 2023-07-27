"use strict";

//Lemon squuezy payment checkou url getting
var express = require("express");

var bodyParser = require("body-parser");

var crypto = require("crypto");

var _require = require("../../models/users"),
    user = _require.user;

var router = express.Router();

var _require2 = require("../../envKeys/allKeys"),
    getKeys = _require2.getKeys;

var keysObjects = getKeys();
var secret = keysObjects.webHookSecret;
var orderCreatedEvent = "order_created"; // Custom middleware to capture the raw request body before parsing it

router.use(bodyParser.json({
  verify: function verify(req, res, buf) {
    req.rawBody = buf.toString();
  }
})); // Endpoint to handle incoming webhook events

router.post("/", function _callee(req, res) {
  var headerSignarture, hmac, generatedSigFromBody, _req$body, data, meta, event_name, custom_data, user_id, accountUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.rawBody) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", console.log(" req.rawBody  does not exist"));

        case 2:
          _context.prev = 2;
          headerSignarture = Buffer.from(req.get("X-Signature") || "", "utf8"); // Verify the signature

          hmac = crypto.createHmac("sha256", secret);
          generatedSigFromBody = Buffer.from(hmac.update(req.rawBody).digest("hex"), "utf8");

          if (crypto.timingSafeEqual(generatedSigFromBody, headerSignarture)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(403).json({
            error: "Invalid signature."
          }));

        case 8:
          // Signature is valid, process the webhook event
          //destructuring data sent to get needed details
          _req$body = req.body, data = _req$body.data, meta = _req$body.meta;
          event_name = meta.event_name, custom_data = meta.custom_data;
          user_id = custom_data.user_id;

          if (!(event_name === orderCreatedEvent)) {
            _context.next = 21;
            break;
          }

          _context.next = 14;
          return regeneratorRuntime.awrap(user.findById(user_id));

        case 14:
          accountUser = _context.sent;

          if (accountUser) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            invalid_User: true
          }));

        case 17:
          //destructuring data sent to get payment details
          console.log(data); // const { status_formatted, first_order_item } = data;
          // const { product_name } = first_order_item;
          // if (!status_formatted != "Paid") return res.sendStatus(204);
          // accountUser.isPaid = true;
          // accountUser.credits = 460;
          // console.log(accountUser);
          // You can perform any actions you want here, such as updating your database, sending notifications, etc.
          // Respond with a 200 status to acknowledge receipt of the webhook

          return _context.abrupt("return", res.sendStatus(200));

        case 21:
          return _context.abrupt("return", res.sendStatus(204));

        case 22:
          _context.next = 27;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 24]]);
});
module.exports = router;