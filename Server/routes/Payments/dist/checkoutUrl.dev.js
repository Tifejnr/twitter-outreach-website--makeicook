"use strict";

//Lemon squuezy payment checkou url getting
var express = require("express");

var router = express.Router();

var _require = require("lemonsqueezy.ts/checkout"),
    createCheckout = _require.createCheckout;

var _require2 = require("../../envKeys/allKeys"),
    getKeys = _require2.getKeys; // const { retrieveStore, listAllStores } = require("lemonsqueezy.ts/store");
// const { retrieveVariant, listAllVariants } = require("lemonsqueezy.ts/variant");


var keysObjects = getKeys();
var lemonApiKey = keysObjects.lemonApiKey;
var standardPlanName = "Stadard Plan";
var storeId = "18668";
var variantId = "101819";
var productPrice = 4.99;
router.post("/", function _callee(req, res) {
  var newCheckout, checkoutUrl, preFillUsersData, checkoutParams;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(createCheckout({
            lemonApiKey: lemonApiKey,
            checkout_data: {
              email: "carter@gmail.com",
              name: "Carter5"
            },
            custom_price: productPrice * 100,
            product_options: {
              description: "Hello World",
              name: standardPlanName,
              receipt_button_text: "Buy now",
              receipt_link_url: "https://lemonsqueezy.com",
              receipt_thank_you_note: "Thank you for your purchase",
              redirect_url: "https://lemonsqueezy.com"
            },
            store: storeId,
            variant: variantId
          }));

        case 3:
          newCheckout = _context.sent;

          if (newCheckout) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", console.log("checkout not sucessfull"));

        case 6:
          checkoutUrl = newCheckout.data.attributes.url;
          preFillUsersData = newCheckout.data.attributes.checkout_data;
          checkoutParams = {
            checkoutUrl: checkoutUrl,
            preFillUsersData: preFillUsersData
          };
          console.log(checkoutParams);
          return _context.abrupt("return", res.json({
            checkoutParams: checkoutParams
          }));

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.log("An error occurred:", _context.t0);
          res.json({
            error: _context.t0
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
module.exports = router;