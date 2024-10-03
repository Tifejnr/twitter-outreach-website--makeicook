import user from "../../server-utils/database/usersDb.js";
import jwt from "jsonwebtoken";
import coookieParser from "cookie-parser";
import express from "express";
import axios from "axios";
import customTransRefGen from "../../server-utils/payments-related/custom-trans-ref-gen/customTransRefGen.js";
import isTokenValid from "../../server-utils/middleware/token-validity/isTokenValid.js";
import { nowVerifyAmount } from "./confirmation-related/verifyAmountFromClient.js";
import sendEmail from "../../server-utils/emailTemplates/sendEmail.js";
import PaystackAPI from "paystack-api";
import emailTemplateFolderSrc from "../../server-utils/emailTemplates/template-folder-src/emailTemplateFolderSrc.js";
import allPricingPlansObj from "./all-plan-obj/allPlanObj.js";
import getSecretKeys from "../../envVariables/envVariables.js";
import getCreditsAwarded from "./confirmation-related/getCreditsAwarded.js";

// const {
//   calculateAffliateFees,
// } = require("/root/Wfr-Digital-Ocean/middleware/affliatesFees/feesCalculation");
// const {
//   updateAffliateAmount,
// } = require("/root/Wfr-Digital-Ocean/models/affliates");

const handlePaymentsRouter = express.Router();

handlePaymentsRouter.use(coookieParser());

const keysObject = getSecretKeys();
// const PAYSTACK_SECRET = keysObject.PAYSTACK_SECRET;
const PAYSTACK_SECRET = "sk_test_77f56feec74a6a039f819388e83cb24feeb1e572";
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;

handlePaymentsRouter.post("/payment", [nowVerifyAmount], async (req, res) => {
  const { email, customerName, coachCode, customizedParams } = req;

  const customTransactionReference = customTransRefGen(customizedParams);

  const bodyRequest = await req.body;

  const resultOfTokenValidation = await isTokenValid(bodyRequest);

  if (!resultOfTokenValidation.decodedPayload) {
    return res.status(401).json({ invalidToken: true });
  }

  const { naira, planPrice } = bodyRequest;

  const amount = planPrice; // multiply by 100 to convert it to kobo
  const Paystack = PaystackAPI(PAYSTACK_SECRET);
  const creditsAwarded = getCreditsAwarded(planPrice, naira);

  const paymentData = {
    email: email,
    amount: amount * 100, // in kobo
    reference: customTransactionReference,
    callback_url: `${keysObject.websiteURL}/verify-payment`,
    channels: ["card"],

    metadata: {
      cancel_action: "https://workforreputation.com/cancel-payment",
      custom_fields: [
        {
          name: customerName,
          paid_For: `${creditsAwarded} credits`,
          credits_Awarded: creditsAwarded,
          amount_Paid: planPrice,
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
});

//payment verification
handlePaymentsRouter.get("/paystack-verify", async (req, res) => {
  //get request sent
  const token = req.cookies.authToken;

  console.log("token", token);

  const decodedPayload = jwt.verify(token, JWT_PRIVATE_KEY);

  if (!decodedPayload) return { invalidToken: true };

  const reference = req.query.reference;

  console.log("reference", reference);

  const accountUser = await user.findById(req.user._id);
  const customerEmail = accountUser.email;

  const keysObject = getSecretKeys();
  const PAYSTACK_SECRET = keysObject.PAYSTACK_SECRET;

  await axios
    .get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        authorization: `Bearer ${PAYSTACK_SECRET}`,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    })
    .then((response) => {
      const transaction = response.data.data;
      const status = transaction.status;
      const creditsPaidFor = transaction.metadata.custom_fields[0].paid_For;
      const name = transaction.metadata.custom_fields[0].name;
      const creditsAwarded =
        transaction.metadata.custom_fields[0].credits_Awarded;

      const paymentDateRaw = new Date(transaction.paid_at);
      const paymentDateRawStringified = paymentDateRaw.toString();
      const paymentDateRawSplitted = paymentDateRawStringified.split(" ");
      const paymentDayName = paymentDateRawSplitted[0];
      const paymentMonth = paymentDateRawSplitted[1];
      const paymentDayNo = paymentDateRawSplitted[2];
      const paymentYear = paymentDateRawSplitted[3];
      const paymentTime = paymentDateRawSplitted[4];

      const paymentDate = `${paymentDayName} ${paymentMonth} ${paymentDayNo} ${paymentYear} ${paymentTime}`;
      // If the payment was successful, redirect to a success page
      if (status === "success") {
        const exactAmount = transaction.amount / 100; //to kobo
        const amount = exactAmount.toFixed(2); // to add .00 at the back

        // const affliateFeeTotal = calculateAffliateFees(creditsPaidFor);

        // const affliateFeeInNaira = `${
        //   transaction.currency
        // } ${affliateFeeTotal.toFixed(2)}`;
        // console.log(affliateFeeInNaira);

        const emailReceiptParams = {
          name: name,
          amount: `${transaction.currency} ${amount}`,
          creditsPaidFor: creditsPaidFor,
          paymentMethod: transaction.channel,
          time: paymentDate,
          transReference: transaction.reference,
        };

        const subject = "Payment Received";
        const folderDir = `${emailTemplateFolderSrc}/payment-receipt/to-client`;

        const customerParams = {
          subject: subject,
          folderDir: folderDir,
          customerEmail: customerEmail,
        };

        // const updateAffliateParams = {
        //   affliateFeesNow: affliateFeeTotal,
        //   threeLettersEntryCode: coachCode,
        // };
        saveInfoToDb();
        async function saveInfoToDb() {
          accountUser.set({
            isPaid: true,
            paidFor: creditsPaidFor,
          });

          accountUser.credits += +creditsAwarded;

          console.log("accountUser.credits", accountUser.credits);

          const savingUserToDb = await accountUser.save();
          //   const saveAffliate = await updateAffliateAmount(updateAffliateParams);

          //   const affliatEmailReceiptParams = {
          //     name: name,
          //     commission: affliateFeeInNaira,
          //     weeklyEarnings: saveAffliate.weeklyEarnings,
          //     totalEarned: saveAffliate.totalEarned,
          //     purchasedService: creditsPaidFor,
          //     time: paymentDate,
          //     transReference: transaction.reference,
          //   };

          //   const affliateMailHeading = "Your Comission";
          //   const affliateFolder = "/root/Wfr-Digital-Ocean/zAffliatesReceipt";

          //   const afflateParams = {
          //     subject: affliateMailHeading,
          //     folderDir: affliateFolder,
          //     customerEmail: saveAffliate.affliateEmail,
          //   };

          if (savingUserToDb) {
            sendEmail(customerParams, emailReceiptParams);
            // sendEmail(afflateParams, affliatEmailReceiptParams);
            res.redirect("/homepage");
          } else {
            console.log("eror, somthing happended g");
          }
        }
      } else {
        console.log("Unknown Error has Occured");
        res.redirect("/error");
      }
    })

    .catch((error) => {
      console.log(error);
    });
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
