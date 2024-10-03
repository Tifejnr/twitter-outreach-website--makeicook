import allPricingPlansObj from "../all-plan-obj/allPlanObj.js";

export default function getCreditsAwarded(planPrice) {
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

  if (!isNairaOwnValid || !isDollarOwnValid) return false;

  let pricingPlanFound;

  if (isNairaOwnValid) {
    pricingPlanFound = isNairaOwnValid;
  }

  if (isDollarOwnValid) {
    pricingPlanFound = isDollarOwnValid;
  }

  const { perCreditInfo } = pricingPlanFound;

  const planPriceForCreditCalaucaltion = planPrice + 100;
  const creditsAmount = Math.round(
    planPriceForCreditCalaucaltion / perCreditInfo
  );

  console.log("creditsAmount", creditsAmount, pricingPlanFound);

  return creditsAmount;
}
