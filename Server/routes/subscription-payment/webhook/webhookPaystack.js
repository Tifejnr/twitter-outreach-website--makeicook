import express from "express";
import crypto from "crypto";
import bodyParser from "body-parser";
import user from "../../../server-utils/database/usersDb.js";
import getSecretKeys from "../../../envVariables/envVariables.js";
import allPricingPlansObj from "../all-plan-obj/allPlanObj.js";

const keysObjects = getSecretKeys();
const secret = "sk_test_77f56feec74a6a039f819388e83cb24feeb1e572";
// const secret = keysObjects.PAYSTACK_SECRET;

const orderCreatedEvent = "order_created";

const chargeSuccessEvent = "charge.success";

const webhookPaystackRouter = express.Router();
// Custom middleware to capture the raw request body before parsing it
// webhookPaystackRouter.use(
//   bodyParser.json({
//     verify: (req, res, buf) => {
//       req.rawBody = buf.toString();
//     },
//   })
// );

// Endpoint to handle incoming webhook events
webhookPaystackRouter.post("/", async (req, res) => {
  console.log("on webhook page hahahahah");

  try {
    //validate event
    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");
    if (hash == req.headers["x-paystack-signature"]) {
      // Retrieve the request's body
      const { event, data } = req.body;

      const { metadata } = data;
      const { custom_fields } = metadata;

      console.log("suucceful ooooooooooooo", event);

      if (event == chargeSuccessEvent) {
        console.log("custom_fields", custom_fields);
      }
      // Do something with event
    }
    res.sendStatus(200);

    return;

    if (!crypto.timingSafeEqual(generatedSigFromBody, headerSignarture))
      return res.status(403).json({ error: "Invalid signature." });
    // Signature is valid, process the webhook event

    //destructuring data sent to get needed details

    console.log("suucceful ooooooooooooo");
    return res.sendStatus(200);
    // const { data, meta } = req.body;
    // const { event_name, custom_data } = meta;
    // const { user_id } = custom_data;

    // if (event_name === orderCreatedEvent) {
    //   const accountUser = await user.findById(user_id);
    //   if (!accountUser) return res.status(400).json({ invalid_User: true });

    //   //destructuring data sent to get payment details
    //   const { attributes } = data;
    //   const { first_order_item, status_formatted } = attributes;
    //   const { variant_id } = first_order_item;
    //   console.log(status_formatted);

    //   if (status_formatted != "Paid") return res.sendStatus(204);
    //   //getting product details to update
    //   const product = allPlansArrayObj.find(
    //     (planObj) => planObj.variantId == variant_id
    //   );

    //   if (!product) {
    //     console.log("product not found");
    //     return res.status(402).json({ notFound: true });
    //   }
    //   //set  user status to paid
    //   accountUser.isPaid = true;

    //   //add the payed for credit to current users credits
    //   const currentUserCredit = accountUser.credits;
    //   accountUser.credits = currentUserCredit + product.credits;

    //   //save user details
    //   await accountUser.save();

    // Respond with a 200 status to acknowledge receipt of the webhook
    return res.sendStatus(200);
    // } else {
    //   // For other events, respond with a 204 status to indicate that the event is not handled by this endpoint
    //   return res.sendStatus(204);
    // }
  } catch (error) {
    console.log(error);
  }
});

export default webhookPaystackRouter;
