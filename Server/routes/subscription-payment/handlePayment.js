import coookieParser from "cookie-parser";
import express from "express";
import { createCheckout } from "lemonsqueezy.ts/checkout";
import customTransRefGen from "../../server-utils/payments-related/custom-trans-ref-gen/customTransRefGen.js";
import isTokenValid from "../../server-utils/middleware/token-validity/isTokenValid.js";
import { nowVerifyAmount } from "./confirmation-related/verifyAmountFromClient.js";
import PaystackAPI from "paystack-api";
import allPricingPlansObj from "./all-plan-obj/allPlanObj.js";
import getSecretKeys from "../../envVariables/envVariables.js";
import getCreditsAwarded from "./confirmation-related/getCreditsAwarded.js";
import dollarPricingPlansObjArray from "./all-plan-obj/dollarPricingPlanObjArray.js";

// const {
//   calculateAffliateFees,
// } = require("/root/Wfr-Digital-Ocean/middleware/affliatesFees/feesCalculation");
// const {
//   updateAffliateAmount,
// } = require("/root/Wfr-Digital-Ocean/models/affliates");

const handlePaymentsRouter = express.Router();

handlePaymentsRouter.use(coookieParser());

const keysObject = getSecretKeys();
const PAYSTACK_SECRET = keysObject.PAYSTACK_SECRET;
// const PAYSTACK_SECRET = "sk_test_77f56feec74a6a039f819388e83cb24feeb1e572";
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;
const apiKey = keysObject.lemonApiKey;
const storeId = keysObject.storeId;

// const redirectUrl = `${keysObject.websiteURL}/verify-payment`;
const redirectUrl = `https://workforreputation.com/verify-payment`;

handlePaymentsRouter.post("/payment", [nowVerifyAmount], async (req, res) => {
  const {
    email,
    customerName,
    coachCode,
    customizedParams,
    planPrice,
    user_id,
  } = req;

  const customTransactionReference = customTransRefGen(customizedParams);

  const bodyRequest = await req.body;

  const resultOfTokenValidation = await isTokenValid(bodyRequest);

  if (!resultOfTokenValidation.decodedPayload) {
    return res.status(401).json({ invalidToken: true });
  }

  const { naira } = bodyRequest;

  console.log("naira", naira);

  if (naira) {
    const amount = planPrice; // multiply by 100 to convert it to kobo
    const Paystack = PaystackAPI(PAYSTACK_SECRET);
    const creditsAwarded = getCreditsAwarded(planPrice, naira);

    const paymentData = {
      email: email,
      amount: amount * 100, // in kobo
      reference: customTransactionReference,
      callback_url: redirectUrl,
      channels: ["card"],

      metadata: {
        cancel_action: "https://workforreputation.com/cancel-payment",
        custom_fields: [
          {
            name: customerName,
            paid_For: `${creditsAwarded} credits`,
            credits_Awarded: Number(creditsAwarded),
            user_id: user_id,
          },
        ],
      },
    };

    Paystack.transaction
      .initialize(paymentData)
      .then(function (body) {
        const paymentLink = body.data.authorization_url;
        res.json({ paymentLink: paymentLink });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    try {
      const creditsAwarded = getCreditsAwarded(planPrice, naira);

      //getting product details first
      //is it dollar payment.
      const product = dollarPricingPlansObjArray.find(
        (eachPrice) => eachPrice.planPrice === planPrice
      );

      if (!product) {
        console.log("product not found");
        return res.status(402).json({ notFound: true });
      }

      const productName = `${product.planName} - ${creditsAwarded} credits`;
      const productDescp = `You will get ${creditsAwarded} credits`;
      const variantId = product.variantId;
      const productPrice = product.planPrice;

      //create checkout url link
      const newCheckout = await createCheckout({
        apiKey,
        checkout_data: {
          email: email,
          custom: {
            user_id: user_id,
            creditsAwarded: `${creditsAwarded}`,
            variantId: `${variantId}`,
            coachCode,
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

      if (!newCheckout) {
        console.log("checkout not sucessfull");
        res.json({ error: "An error cocured, retry" });
      }

      const checkoutUrl = newCheckout.data.attributes.url;
      return res.json({ paymentLink: checkoutUrl });
    } catch (error) {
      console.log("An error occurred in checkout:", error);
      res.json({ error });
    }
  }
});

handlePaymentsRouter.post("/getPrices", async (req, res) => {
  try {
    res.status(200).json({ allPricingPlansObj });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

export default handlePaymentsRouter;
