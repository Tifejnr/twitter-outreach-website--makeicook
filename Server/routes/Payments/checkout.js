//Lemon squuezy payment checkou url getting
const express = require("express");
const { user } = require("../../models/users");
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
  const productName = `${planName} Plan`;

  try {
    //get userId to be sent in chekout details
    const accountUser = await user.findById(userDetails._id);
    const { email, _id } = accountUser;

    const newCheckout = await createCheckout({
      apiKey,
      checkout_data: {
        email: email,
        custom: {
          user_id: _id,
        },
      },
      custom_price: productPrice * 100,
      product_options: {
        description: "You get 460 credits",
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
