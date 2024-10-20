import express from "express";
import crypto from "crypto";
import user from "../../../server-utils/database/usersDb.js";
import getSecretKeys from "../../../envVariables/envVariables.js";
import allPricingPlansObj from "../all-plan-obj/allPlanObj.js";

const keysObjects = getSecretKeys();
const secret = keysObjects.webHookSecretLemon;
const orderCreatedEvent = "order_created";

const webhookLemonsqueezyRouter = express.Router();

// Middleware to capture raw body
webhookLemonsqueezyRouter.use(
  express.raw({ type: "application/json" }) // Capture raw body for JSON content type
);

webhookLemonsqueezyRouter.post("/", async (req, res) => {
  try {
    const rawBody = req.body; // This will be a buffer
    const headerSignature = Buffer.from(req.get("X-Signature") || "", "utf8");

    // Verify the signature
    const hmac = crypto.createHmac("sha256", secret);
    const generatedSigFromBody = Buffer.from(
      hmac.update(rawBody).digest("hex"), // Use rawBody, which is a buffer
      "utf8"
    );

    if (!crypto.timingSafeEqual(generatedSigFromBody, headerSignature)) {
      return res.status(403).json({ error: "Invalid signature." });
    }

    // Signature is valid, process the webhook event
    const parsedBody = JSON.parse(rawBody.toString()); // Parse raw body to JSON
    console.log("Parsed webhook event:", parsedBody);

    const { data, meta } = parsedBody;
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
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default webhookLemonsqueezyRouter;
