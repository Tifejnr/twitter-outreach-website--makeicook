const { user } = require("/root/Wfr-Digital-Ocean/models/users");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const authChecker = require("/root/Wfr-Digital-Ocean/middleware/auth");
const {
  customTransRefGen,
} = require("/root/Wfr-Digital-Ocean/middleware/customTransRefGen");
const websiteURL = "https://workforreputation.com";
const {
  nowVerifyAmount,
} = require("/root/Wfr-Digital-Ocean/middleware/verifyAmountFromClient");
const {
  sendEmail,
} = require("/root/Wfr-Digital-Ocean/middleware/emailTemplates/sendEmail");
const {
  validateGetNamereq,
} = require("/root/Wfr-Digital-Ocean/middleware/joiValidationPayments/paymentValidations");
const {
  validateGetPricesReq,
} = require("/root/Wfr-Digital-Ocean/middleware/joiValidationPayments/paymentValidations");

const {
  paramsFromServer,
} = require("/root/Wfr-Digital-Ocean/middleware/pricesOfJobs");

const {
  calculateAffliateFees,
} = require("/root/Wfr-Digital-Ocean/middleware/affliatesFees/feesCalculation");
const {
  updateAffliateAmount,
} = require("/root/Wfr-Digital-Ocean/models/affliates");
const { getSecretKeys } = require("/root/Wfr-Digital-Ocean/envVariables");

router.post("/payment", [authChecker, nowVerifyAmount], async (req, res) => {
  const customTransactionReference = customTransRefGen(customizedParams);
  const amount = serverTotalAmount; // multiply by 100 to convert it to kobo

  const keysObject = getSecretKeys();
  const PAYSTACK_SECRET = keysObject.PAYSTACK_SECRET;
  const Paystack = require("paystack-api")(PAYSTACK_SECRET);

  const paymentData = {
    email: email,
    amount: amount * 100, // in kobo
    reference: customTransactionReference,
    callback_url: `${websiteURL}/api/pricingPlans/paystack-verify`,
    channels: ["card"],

    metadata: {
      cancel_action: "https://your-cancel-url.com",
      custom_fields: [
        {
          freelancer_name: customerName,
          paid_For: jobsPaidForIntoReceipt,
          profileLink: profileLink,
          totalQuantity: totalQuantity,
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

router.get("/paystack-verify", authChecker, async (req, res) => {
  const reference = req.query.reference;

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
      const jobsPaidFor = transaction.metadata.custom_fields[0].paid_For;
      const name = transaction.metadata.custom_fields[0].freelancer_name;
      const profileLink = transaction.metadata.custom_fields[0].profileLink;
      const totalQuantity = transaction.metadata.custom_fields[0].totalQuantity;

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

        const affliateFeeTotal = calculateAffliateFees(jobsPaidFor);

        const affliateFeeInNaira = `${
          transaction.currency
        } ${affliateFeeTotal.toFixed(2)}`;
        console.log(affliateFeeInNaira);

        const emailReceiptParams = {
          name: name,
          amount: `${transaction.currency} ${amount}`,
          jobsPaidFor: jobsPaidFor,
          paymentMethod: transaction.channel,
          time: paymentDate,
          transReference: transaction.reference,
        };

        const folderDir = "/root/Wfr-Digital-Ocean/zTransReceipt";
        const subject = "Payment Received";

        const customerParams = {
          subject: subject,
          folderDir: folderDir,
          customerEmail: customerEmail,
        };

        const updateAffliateParams = {
          affliateFeesNow: affliateFeeTotal,
          threeLettersEntryCode: coachCode,
        };
        saveInfoToDb();
        async function saveInfoToDb() {
          accountUser.set({
            isPaid: true,
            paidFor: jobsPaidFor,
            profileLink: profileLink,
            jobsToBeCompleted: totalQuantity,
          });

          const savingUserToDb = await accountUser.save();
          const saveAffliate = await updateAffliateAmount(updateAffliateParams);

          const affliatEmailReceiptParams = {
            name: name,
            commission: affliateFeeInNaira,
            weeklyEarnings: saveAffliate.weeklyEarnings,
            totalEarned: saveAffliate.totalEarned,
            purchasedService: jobsPaidFor,
            time: paymentDate,
            transReference: transaction.reference,
          };

          const affliateMailHeading = "Your Comission";
          const affliateFolder = "/root/Wfr-Digital-Ocean/zAffliatesReceipt";

          const afflateParams = {
            subject: affliateMailHeading,
            folderDir: affliateFolder,
            customerEmail: saveAffliate.affliateEmail,
          };

          if (savingUserToDb && saveAffliate) {
            sendEmail(customerParams, emailReceiptParams);
            sendEmail(afflateParams, affliatEmailReceiptParams);
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

router.post("/getNameAndEmail", authChecker, async (req, res) => {
  const { error } = validateGetNamereq(req.body);
  if (error)
    return res.status(400).json({ emailError: error.details[0].message });

  try {
    const accountUser = await user.findById(req.user._id);
    const email = accountUser.email;
    const name = accountUser.name;
    const getNameAndEmailReq = req.body.getNameAndEmail;

    if (!getNameAndEmailReq) return console.log("Error, can't get the name");
    const nameAndEmailObj = {
      name,
      email,
    };

    res.status(200).json({ nameAndEmailObj });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

router.post("/getPrices", authChecker, async (req, res) => {
  const { error } = validateGetPricesReq(req.body);
  if (error)
    return res.status(400).json({ emailError: error.details[0].message });

  try {
    const paramsFromServerObj = paramsFromServer();

    const paramsToClient = paramsFromServerObj.paramsToClient;
    res.status(200).json({ paramsToClient });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

module.exports = router;
