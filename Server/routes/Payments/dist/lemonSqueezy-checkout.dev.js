"use strict";

//Lemon squuezy payment checkou url getting
var express = require("express");

var axios = require("axios");

var crypto = require("crypto");

var router = express.Router();

var _require = require("lemonsqueezy.ts/checkout"),
    createCheckout = _require.createCheckout;

var _require2 = require("lemonsqueezy.ts/order"),
    retrieveOrder = _require2.retrieveOrder,
    listAllOrders = _require2.listAllOrders;

var _require3 = require("../../envKeys/allKeys"),
    getKeys = _require3.getKeys; // const { retrieveStore, listAllStores } = require("lemonsqueezy.ts/store");
// const { retrieveVariant, listAllVariants } = require("lemonsqueezy.ts/variant");


var keysObjects = getKeys();
var apiKey = keysObjects.lemonApiKey;
var userIdNow = "idgaabkaj568118nahaha";
var standardPlanName = "Standard Plan";
var storeId = "18668";
var variantId = "101819";
var productPrice = 4.99;
var redirectUrl = "https://www.collabfortrello.com";
router.post("/", function _callee(req, res) {
  var planName, productName, newCheckout, checkoutUrl;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          planName = req.body.planName;
          productName = "".concat(planName, " Plans");
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(createCheckout({
            apiKey: apiKey,
            checkout_data: {
              email: "carter@gmail.com",
              custom: {
                user_id: userIdNow
              }
            },
            custom_price: 100000,
            product_options: {
              description: "Hello World",
              name: productName,
              receipt_button_text: "Buy now",
              receipt_link_url: redirectUrl,
              receipt_thank_you_note: "Thank you for your purchase",
              redirect_url: redirectUrl
            },
            store: storeId,
            variant: variantId
          }));

        case 5:
          newCheckout = _context.sent;

          if (newCheckout) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", console.log("checkout not sucessfull"));

        case 8:
          checkoutUrl = newCheckout.data.attributes.url;
          return _context.abrupt("return", res.json({
            checkoutUrl: checkoutUrl
          }));

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);
          console.log("An error occurred:", _context.t0);
          res.json({
            error: _context.t0
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 12]]);
});
module.exports = router; // test();

function test() {
  var newCheckout, checkoutUrl;
  return regeneratorRuntime.async(function test$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(createCheckout({
            apiKey: apiKey,
            checkout_data: {
              email: "carter@gmail.com",
              custom: {
                user_id: userIdNow
              }
            },
            custom_price: productPrice * 100,
            product_options: {
              description: "Hello World",
              name: standardPlanName,
              receipt_button_text: "Buy now",
              receipt_link_url: redirectUrl,
              receipt_thank_you_note: "Thank you for your purchase",
              redirect_url: redirectUrl
            },
            store: storeId,
            variant: variantId
          }));

        case 3:
          newCheckout = _context2.sent;

          if (newCheckout) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", console.log("checkout not sucessfull"));

        case 6:
          checkoutUrl = newCheckout.data.attributes.url;
          console.log(checkoutUrl);
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log("An error occurred:", _context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
} // testOrder();
// async function testOrder() {
//   try {
//     const orders = await listAllOrders({
//       apiKey,
//     });
//     console.log(orders.data);
//     // console.log(orders.data[0].attributes);
//   } catch (error) {
//     console.log("An error occurred:", error);
//   }
// }
// testOrder();


function testOrder() {
  var orderId, order;
  return regeneratorRuntime.async(function testOrder$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          orderId = "986456";
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(retrieveOrder({
            apiKey: apiKey,
            id: orderId
          }));

        case 4:
          order = _context3.sent;
          console.log(order);
          console.log(order.data.relationships);
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](1);
          console.log("An error occurred:", _context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 9]]);
}