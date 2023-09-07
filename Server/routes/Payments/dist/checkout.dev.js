"use strict";

//Lemon squuezy payment checkou url getting
var express = require("express");

var _require = require("../../models/users"),
    user = _require.user;

var router = express.Router();

var _require2 = require("lemonsqueezy.ts/checkout"),
    createCheckout = _require2.createCheckout;

var _require3 = require("lemonsqueezy.ts/order"),
    retrieveOrder = _require3.retrieveOrder,
    listAllOrders = _require3.listAllOrders;

var _require4 = require("../../envKeys/allKeys"),
    getKeys = _require4.getKeys;

var _require5 = require("./allPlanDetails/allPlans"),
    allPlansArrayObj = _require5.allPlansArrayObj; // const { retrieveStore, listAllStores } = require("lemonsqueezy.ts/store");
// const { retrieveVariant, listAllVariants } = require("lemonsqueezy.ts/variant");


var keysObjects = getKeys();
var apiKey = keysObjects.lemonApiKey;
var storeId = "41389";
var redirectUrl = "https://www.collabfortrello.com";
router.post("/", function _callee(req, res) {
  var planName, product, productName, productDescp, variantId, productPrice, accountUser, email, _id, newCheckout, checkoutUrl;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          planName = req.body.planName;
          _context.prev = 1;
          //getting product details first
          product = allPlansArrayObj.find(function (planObj) {
            return planObj.planName == planName;
          });

          if (product) {
            _context.next = 6;
            break;
          }

          console.log("product not found");
          return _context.abrupt("return", res.status(402).json({
            notFound: true
          }));

        case 6:
          productName = "".concat(product.planName, " Plan");
          productDescp = "You will get ".concat(product.credits, " credits");
          variantId = product.variantId;
          productPrice = product.planPrice; //get userId to be sent in chekout details

          _context.next = 12;
          return regeneratorRuntime.awrap(user.findById(userDetails._id));

        case 12:
          accountUser = _context.sent;
          email = accountUser.email, _id = accountUser._id; //create checkout url link

          _context.next = 16;
          return regeneratorRuntime.awrap(createCheckout({
            apiKey: apiKey,
            checkout_data: {
              email: email,
              custom: {
                user_id: _id
              }
            },
            custom_price: productPrice * 100,
            product_options: {
              description: productDescp,
              name: productName,
              receipt_button_text: "Buy now",
              receipt_link_url: redirectUrl,
              receipt_thank_you_note: "Thank you for your purchase",
              redirect_url: redirectUrl
            },
            store: storeId,
            variant: variantId
          }));

        case 16:
          newCheckout = _context.sent;

          if (newCheckout) {
            _context.next = 19;
            break;
          }

          return _context.abrupt("return", console.log("checkout not sucessfull"));

        case 19:
          checkoutUrl = newCheckout.data.attributes.url;
          return _context.abrupt("return", res.json({
            checkoutUrl: checkoutUrl
          }));

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](1);
          console.log("An error occurred:", _context.t0);
          res.json({
            error: _context.t0
          });

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 23]]);
});
module.exports = router;