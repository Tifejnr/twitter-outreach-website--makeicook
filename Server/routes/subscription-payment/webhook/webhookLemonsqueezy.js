import express from "express";
import crypto from "crypto";
import bodyParser from "body-parser";
import user from "../../../server-utils/database/usersDb.js";
import getSecretKeys from "../../../envVariables/envVariables.js";
import emailTemplateFolderSrc from "../../../server-utils/emailTemplates/template-folder-src/emailTemplateFolderSrc.js";
import getFirstName from "../../(customer-requests)/email-users/getFirstname.js";
import sendEmail from "../../../server-utils/emailTemplates/sendEmail.js";
// import dollarPricingPlansObjArray from "../all-plan-obj/dollarPricingPlanObjArray.js";
import formatCustomDate from "../../../server-utils/format-custom-date/formatCustomDate.js";
import customTransRefGenLemonsqueezy from "../../../server-utils/payments-related/custom-trans-ref-gen/customTransRefGenLemonsqueezy.js";
import allPricingPlansObj from "../all-plan-obj/allPlanObj.js";

const keysObjects = getSecretKeys();
const secret = keysObjects.webHookSecretLemon;

const subscriptionPaymentSuccessEvent = "subscription_payment_success";
const subscriptionCreatedEvent = "subscription_created";
const subscriptionUpdatedEvent = "subscription_updated";

const webhookLemonsqueezyRouter = express.Router();

// Custom middleware to capture the raw request body before parsing it
webhookLemonsqueezyRouter.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString("utf8"); // Explicitly convert buffer to string
    },
  })
);

// Endpoint to handle incoming webhook events
webhookLemonsqueezyRouter.post("/", async (req, res) => {
  if (!req.rawBody) return console.log("req.rawBody does not exist");

  try {
    const headerSignature = req.get("X-Signature");
    if (!headerSignature) {
      return res.status(403).json({ error: "Missing signature header." });
    }

    // Create the HMAC signature
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(req.rawBody); // Ensure rawBody is passed as a string
    const generatedSigFromBody = hmac.digest("hex");

    // Convert both signatures to Buffers for constant-time comparison
    const generatedSignatureBuffer = Buffer.from(generatedSigFromBody, "utf8");
    const headerSignatureBuffer = Buffer.from(headerSignature, "utf8");

    // Use timingSafeEqual for secure comparison
    if (
      !crypto.timingSafeEqual(generatedSignatureBuffer, headerSignatureBuffer)
    ) {
      return res.status(403).json({ error: "Invalid signature." });
    }

    // Signature is valid, proceed with processing the event

    const { data, meta } = req.body;
    const { event_name, custom_data } = meta;
    const { user_id, variantId, coachCode } = custom_data;

    if (
      event_name.trim() == subscriptionCreatedEvent.trim() ||
      event_name.trim() == subscriptionPaymentSuccessEvent.trim() ||
      event_name.trim() == subscriptionUpdatedEvent.trim()
    ) {
      // Destructure data to get payment details
      const { attributes } = data;
      const {
        status_formatted,
        created_at,
        user_name,
        user_email,
        order_id,
        subtotal_formatted,
        renews_at,
      } = attributes;

      if (status_formatted !== "Paid") return res.sendStatus(204); // Ignore unpaid orders

      // Get product details based on variant_id
      const product = allPricingPlansObj.find(
        (planObj) => `${planObj.variantId}` == variantId
      );

      if (!product) {
        console.log("Product not found");
        return res.status(402).json({ notFound: true });
      }

      // Set user status to paid and update credits
      const accountUser = await user.findById(user_id);
      if (!accountUser) return res.status(400).json({ invalid_User: true });

      const paidFor = `${product.planName} plan`;

      //set  user status to paid
      accountUser.isPaid = true;
      accountUser.paidFor = paidFor;

      //save user details
      await accountUser.save();

      const paymentDate = formatCustomDate(created_at);
      const reference = customTransRefGenLemonsqueezy(coachCode, order_id);

      //send payment received receipts
      const subject =
        "Payment Received - Twitter (X) prospecting tool  - Make I Cook";
      const folderDir = `${emailTemplateFolderSrc}/receipt/to-customer`;

      const customerParams = {
        subject: subject,
        folderDir: folderDir,
        customerEmail: user_email,
      };

      const channel = "Card";

      const emailContextParamsNow = {
        name: user_name,
        paymentChannel: channel,
        paymentDate,
        transReference: reference,
        paid_For: paidFor,
        amount_Paid: subtotal_formatted,
      };

      const result = await sendEmail(customerParams, emailContextParamsNow);

      if (result) {
        console.log("Payment succesfulyy processed");
        res.sendStatus(200);

        return;
      }

      // Respond with a 200 status to acknowledge receipt of the webhook
      return res.sendStatus(200);
    } else {
      // For other events, respond with a 204 status to indicate that the event is not handled by this endpoint
      return res.sendStatus(204);
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default webhookLemonsqueezyRouter;
