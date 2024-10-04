import allPricingPlansObj from "../all-plan-obj/allPlanObj.js";

export default function getCreditsAwarded(planPrice, naira) {
  const { nairaPricingPlansObjArray, dollarPricingPlansObjArray } =
    allPricingPlansObj;

  //is it naira payment.

  const isNairaOwnValid = nairaPricingPlansObjArray.find(
    (eachPrice) => eachPrice.planPrice === planPrice
  );

  //is it dollar payment.
  const isDollarOwnValid = dollarPricingPlansObjArray.find(
    (eachPrice) => eachPrice.planPrice === planPrice
  );

  if (!isNairaOwnValid && !isDollarOwnValid) return false;

  let pricingPlanFound;

  if (isNairaOwnValid) {
    pricingPlanFound = isNairaOwnValid;
  }

  if (isDollarOwnValid) {
    pricingPlanFound = isDollarOwnValid;
  }

  const { perCreditInfo, additionalCredits } = pricingPlanFound;

  let planPriceForCreditCalaucaltion;

  if (naira) {
    planPriceForCreditCalaucaltion = planPrice + 100;
  } else {
    planPriceForCreditCalaucaltion = planPrice + 0.01;
  }

  let creditsAmount = Math.round(
    planPriceForCreditCalaucaltion / perCreditInfo
  );

  if (additionalCredits) {
    creditsAmount = creditsAmount + additionalCredits;
  }

  return Number(creditsAmount);
}
