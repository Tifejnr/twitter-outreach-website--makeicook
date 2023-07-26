//Lemon squuezy payment checkou url getting
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const router = express.Router();

const { createCheckout } = require("lemonsqueezy.ts/checkout");
const { retrieveOrder, listAllOrders } = require("lemonsqueezy.ts/order");
const { getKeys } = require("../../envKeys/allKeys");
// const { retrieveStore, listAllStores } = require("lemonsqueezy.ts/store");
// const { retrieveVariant, listAllVariants } = require("lemonsqueezy.ts/variant");

const keysObjects = getKeys();
const apiKey = keysObjects.lemonApiKey;

const userIdNow = "idgaabkaj568118nahaha";
const standardPlanName = "Standard Plan";
const storeId = "18668";
const variantId = "101819";
const productPrice = 4.99;
const redirectUrl = "https://www.collabfortrello.com";

router.post("/", async (req, res) => {
  const { planName } = req.body;
  const productName = `${planName} Plans`;

  try {
    const newCheckout = await createCheckout({
      apiKey,
      checkout_data: {
        email: "carter@gmail.com",
        custom: {
          user_id: userIdNow,
        },
      },
      custom_price: 100000,
      product_options: {
        description: "Hello World",
        name: productName,
        receipt_button_text: "Buy now",
        receipt_link_url: redirectUrl,
        receipt_thank_you_note: "Thank you for your purchase",
        redirect_url: redirectUrl,
      },
      store: storeId,
      variant: variantId,
    });

    if (!newCheckout) return console.log("checkout not sucessfull");

    const checkoutUrl = newCheckout.data.attributes.url;
    return res.json({ checkoutUrl });
  } catch (error) {
    console.log("An error occurred:", error);
    res.json({ error });
  }
});

module.exports = router;

// test();
async function test() {
  try {
    const newCheckout = await createCheckout({
      apiKey,
      checkout_data: {
        email: "carter@gmail.com",

        custom: {
          user_id: userIdNow,
        },
      },
      custom_price: productPrice * 100,
      product_options: {
        description: "Hello World",
        name: standardPlanName,
        receipt_button_text: "Buy now",
        receipt_link_url: redirectUrl,
        receipt_thank_you_note: "Thank you for your purchase",
        redirect_url: redirectUrl,
      },
      store: storeId,
      variant: variantId,
    });

    if (!newCheckout) return console.log("checkout not sucessfull");

    const checkoutUrl = newCheckout.data.attributes.url;
    console.log(checkoutUrl);
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

// testOrder();
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
async function testOrder() {
  const orderId = "986456";
  try {
    const order = await retrieveOrder({
      apiKey,
      id: orderId,
    });

    console.log(order);
    console.log(order.data.relationships);
  } catch (error) {
    console.log("An error occurred:", error);
  }
}
