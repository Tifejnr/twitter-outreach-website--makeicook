import express from "express";
import crypto from "crypto";
import bodyParser from "body-parser";
import user from "../../../server-utils/database/usersDb.js";
import getSecretKeys from "../../../envVariables/envVariables.js";
import allPricingPlansObj from "../all-plan-obj/allPlanObj.js";

const keysObjects = getSecretKeys();
const secret = "sk_test_77f56feec74a6a039f819388e83cb24feeb1e572";
// const secret = keysObjects.PAYSTACK_SECRET;

const chargeSuccessEvent = "charge.success";

const webhookPaystackRouter = express.Router();

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

      console.log("suucceful ooooooooooooo", data);

      if (event == chargeSuccessEvent) {
        console.log("custom_fields", custom_fields);

        const { paid_at, channel } = data;

        const { user_id, name, credits_Awarded, amount_Paid } = custom_fields;

        const accountUser = await user.findById(user_id);

        console.log("accountUser", accountUser);
        if (!accountUser) return res.status(400).json({ invalid_User: true });

        //set  user status to paid
        accountUser.isPaid = true;

        //add the payed for credit to current users credits
        const currentUserCredit = accountUser.credits;
        accountUser.credits = currentUserCredit + credits_Awarded;

        //save user details
        await accountUser.save();

        const paymentChannel = channel;

        const paymentDateRaw = new Date(paid_at);
        const paymentDateRawStringified = paymentDateRaw.toString();
        const paymentDateRawSplitted = paymentDateRawStringified.split(" ");
        const paymentDayName = paymentDateRawSplitted[0];
        const paymentMonth = paymentDateRawSplitted[1];
        const paymentDayNo = paymentDateRawSplitted[2];
        const paymentYear = paymentDateRawSplitted[3];
        const paymentTime = paymentDateRawSplitted[4];

        const paymentDate = `${paymentDayName} ${paymentMonth} ${paymentDayNo} ${paymentYear} ${paymentTime}`;

        const customerEmailParams = {
          name,
          paymentChannel,
          paymentDate,
          amount_Paid,
        };

        console.log("customerEmailParams", customerEmailParams);

        //send receipts
      }
      // Do something with event
    }
    res.sendStatus(200);

    return;
  } catch (error) {
    console.log(error);
  }
});

export default webhookPaystackRouter;
