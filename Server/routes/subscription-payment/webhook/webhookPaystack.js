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

      const {
        metadata,
        domain,
        amount,
        currency,
        reference,
        customer,
        paid_at,
        channel,
      } = data;
      const { custom_fields } = metadata;

      // if (domain == "test") {
      //   console.log("it's test environment ooo");

      //   res.sendStatus(200);

      //   return
      // }

      // console.log("suucceful ooooooooooooo", data);

      if (event == chargeSuccessEvent) {
        // console.log("custom_fields", custom_fields);

        const { user_id, name, credits_Awarded, paid_For } = custom_fields[0];

        const { email } = customer;

        const accountUser = await user.findById(user_id);

        if (!accountUser) return res.status(400).json({ invalid_User: true });

        //set  user status to paid
        accountUser.isPaid = true;
        // function extractNumber(str) {
        //   // Use a regular expression to remove all non-digit characters
        //   const numberOnly = str.replace(/\D/g, "");

        //   // Convert the resulting string to a number
        //   return Number(numberOnly);
        // }

        // const credistAwardedNumber = extractNumber(credits_Awarded);
        //add the payed for credit to current users credits
        const currentUserCredit = accountUser.credits;

        console.log(
          "currentUserCredit + credits_Awarded",
          Number(currentUserCredit),
          credits_Awarded
        );
        const totalAccountCredits = currentUserCredit + credits_Awarded;
        accountUser.credits = totalAccountCredits;

        //save user details
        await accountUser.save();

        const paymentDateRaw = new Date(paid_at);
        const paymentDateRawStringified = paymentDateRaw.toString();
        const paymentDateRawSplitted = paymentDateRawStringified.split(" ");
        const paymentDayName = paymentDateRawSplitted[0];
        const paymentMonth = paymentDateRawSplitted[1];
        const paymentDayNo = paymentDateRawSplitted[2];
        const paymentYear = paymentDateRawSplitted[3];
        const paymentTime = paymentDateRawSplitted[4];

        const paymentDate = `${paymentDayName} ${paymentMonth} ${paymentDayNo} ${paymentYear} ${paymentTime}`;

        const exactAmount = amount / 100; //to kobo
        const amountToFixed = exactAmount.toFixed(2); // to add .00 at the back

        //send receipts

        //send welcome to new user
        const subject = "Payment Received - Work for Reputation - WFR Toolkit!";
        const folderDir = `${emailTemplateFolderSrc}/receipt/to-customer`;

        const customerParams = {
          subject: subject,
          folderDir: folderDir,
          customerEmail: email,
        };

        const emailContextParamsNow = {
          name,
          paymentChannel: channel,
          paymentDate,
          transReference: reference,
          paid_For,
          amount_Paid: `${currency} ${amountToFixed}`,
        };

        const result = await sendEmail(customerParams, emailContextParamsNow);

        if (result) {
          console.log("Payment succesfulyy processed");
          res.sendStatus(200);

          return;
        }

        return res.sendStatus(200);
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
