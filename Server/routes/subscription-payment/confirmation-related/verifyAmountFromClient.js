import isDataFromClientValid from "./isDataFromClientValid.js";
import user from "../../../server-utils/database/usersDb.js";
import { validatePaymentParams } from "../joiValidationPayments/paymentValidations.js";
import isTokenValid from "../../../server-utils/middleware/token-validity/isTokenValid.js";
import allPricingPlansObj from "../all-plan-obj/allPlanObj.js";

async function nowVerifyAmount(req, res, next) {
  const bodyRequest = req.body;

  const { error } = validatePaymentParams(bodyRequest);
  if (error) {
    return res.status(400).json({ joiError: error.details[0].message });
  }

  // Authentication
  const resultOfTokenValidation = await isTokenValid(bodyRequest);
  if (!resultOfTokenValidation.decodedPayload) {
    return res.status(401).json({ invalidToken: true });
  }

  const { decodedPayload } = resultOfTokenValidation;
  const accountUser = await user.findById(decodedPayload._id);
  if (!accountUser) return res.status(401).json({ invalidToken: true });

  const { planPrice } = bodyRequest;

  // Extract necessary values
  const email = accountUser.email;
  const customerName = accountUser.name;
  const coachCodeRaw = accountUser.entryCode;
  const user_id = accountUser._id;
  const coachCode = getFirst3Letters(coachCodeRaw);

  const customizedParams = {
    coachCode: coachCode,
  };

  // Attach values to req object
  req.email = email;
  req.customerName = customerName;
  req.coachCode = coachCode;
  req.customizedParams = customizedParams;
  req.planPrice = planPrice;
  req.user_id = user_id;

  const isPriceValid = isDataFromClientValid(allPricingPlansObj, planPrice);

  if (isPriceValid) {
    next();
  } else {
    return res.status(401).json({ scam: true });
  }
}

function getFirst3Letters(coachCodeRaw) {
  return coachCodeRaw.slice(0, 3);
}

export { nowVerifyAmount, getFirst3Letters };
