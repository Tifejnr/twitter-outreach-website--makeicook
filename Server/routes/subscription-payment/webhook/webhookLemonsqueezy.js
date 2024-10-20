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

    console.log("git here hahahhaaaaaaaaaa, mf");

    // Signature is valid, proceed with processing the event
    const { data, meta } = req.body;
    const { event_name, custom_data } = meta;
    const { user_id, creditsAwarded } = custom_data;

    console.log("creditsAwarded", creditsAwarded);

    if (event_name === orderCreatedEvent) {
      const accountUser = await user.findById(user_id);
      if (!accountUser) return res.status(400).json({ invalid_User: true });

      // Destructure data to get payment details
      const { attributes } = data;
      const { first_order_item, status_formatted } = attributes;
      const { variant_id } = first_order_item;

      console.log(status_formatted);

      if (status_formatted !== "Paid") return res.sendStatus(204); // Ignore unpaid orders

      // Get product details based on variant_id
      const product = allPricingPlansObj.find(
        (planObj) => planObj.variantId === variant_id
      );

      if (!product) {
        console.log("Product not found");
        return res.status(402).json({ notFound: true });
      }

      // Set user status to paid and update credits
      accountUser.isPaid = true;
      accountUser.credits = (accountUser.credits || 0) + Number(creditsAwarded);

      // Save updated user details
      await accountUser.save();

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
