//Lemon squuezy payment checkou url getting
import express from "express";
import crypto from "crypto";
import bodyParser from "body-parser";
import user from "../../../server-utils/database/usersDb.js";
import getSecretKeys from "../../../envVariables/envVariables.js";
import allPricingPlansObj from "../all-plan-obj/allPlanObj.js";
import emailTemplateFolderSrc from "../../../server-utils/emailTemplates/template-folder-src/emailTemplateFolderSrc.js";
import getFirstName from "../../(customer-requests)/email-users/getFirstname.js";
import sendEmail from "../../../server-utils/emailTemplates/sendEmail.js";

const keysObjects = getSecretKeys();
const secret = keysObjects.webHookSecretLemon;

const orderCreatedEvent = "order_created";

const webhookLemonsqueezyRouter = express.Router();
// Custom middleware to capture the raw request body before parsing it
webhookLemonsqueezyRouter.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf; // Keep this as a buffer
    },
  })
);

webhookLemonsqueezyRouter.post("/", async (req, res) => {
  console.log("req.body", req.body);
  try {
    const headerSignarture = Buffer.from(req.get("X-Signature") || "y", "utf8");

    // Verify the signature
    const hmac = crypto.createHmac("sha256", secret);
    const generatedSigFromBody = Buffer.from(
      hmac.update(req.rawBody).digest("hex"), // Use req.rawBody instead of req.body
      "utf8"
    );

    if (!crypto.timingSafeEqual(generatedSigFromBody, headerSignarture))
      return res.status(403).json({ error: "Invalid signature." });

    // Signature is valid, process the webhook event
    console.log("eeeee reach ooo", req.body);

    // Process the event...
    const { data, meta } = req.body;
    const { event_name, custom_data } = meta;
    const { user_id } = custom_data;

    if (event_name === orderCreatedEvent) {
      const accountUser = await user.findById(user_id);
      if (!accountUser) return res.status(400).json({ invalid_User: true });

      const { attributes } = data;
      const { first_order_item, status_formatted } = attributes;
      const { variant_id } = first_order_item;

      if (status_formatted != "Paid") return res.sendStatus(204);

      const product = allPlansArrayObj.find(
        (planObj) => planObj.variantId == variant_id
      );

      if (!product) {
        return res.status(402).json({ notFound: true });
      }

      accountUser.isPaid = true;
      accountUser.credits += product.credits;

      await accountUser.save();
      return res.sendStatus(200);
    } else {
      return res.sendStatus(204);
    }
  } catch (error) {
    console.log(error);
  }
});

export default webhookLemonsqueezyRouter;
