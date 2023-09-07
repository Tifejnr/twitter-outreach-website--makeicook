//Lemon squuezy payment checkou url getting
const express = require("express");
const { user } = require("../../models/users");
const router = express.Router();

const { createCheckout } = require("lemonsqueezy.ts/checkout");
const { retrieveOrder, listAllOrders } = require("lemonsqueezy.ts/order");
const { getKeys } = require("../../envKeys/allKeys");
const { allPlansArrayObj } = require("./allPlanDetails/allPlans");
// const { retrieveStore, listAllStores } = require("lemonsqueezy.ts/store");
// const { retrieveVariant, listAllVariants } = require("lemonsqueezy.ts/variant");

const keysObjects = getKeys();
const apiKey = keysObjects.lemonApiKey;

const storeId = "41389";
const redirectUrl = "https://www.collabfortrello.com";

router.post("/", async (req, res) => {
  const { planName } = req.body;

  try {
    //getting product details first
    const product = allPlansArrayObj.find(
      (planObj) => planObj.planName == planName
    );

    if (!product) {
      console.log("product not found");
      return res.status(402).json({ notFound: true });
    }

    const productName = `${product.planName} Plan`;
    const productDescp = `You will get ${product.credits} credits`;
    const variantId = product.variantId;
    const productPrice = product.planPrice;

    //get userId to be sent in chekout details
    const accountUser = await user.findById(userDetails._id);
    const { email, _id } = accountUser;

    //create checkout url link
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
        description: productDescp,
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
