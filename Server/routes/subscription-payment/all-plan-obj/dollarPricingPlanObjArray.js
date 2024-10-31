const freePlanObj = {
  planName: "Free",
  perCreditInfo: 0.25,
  planCreditsAmount: 0,
  planPrice: 0,
  suitabilityTimeUsage: "",
  noOfDailyJobsItCanBeUsedToApplyTo: 0,
};

const variantIdRegular = "563237";
// const variantIdRegularTest = "563935";

const regularPlanObj = {
  planName: "Regular",
  perCreditInfo: 0.008 * 2,
  planCreditsAmount: 3000,
  planPrice: 3.99,
  suitabilityTimeUsage: "less than 10",
  noOfDailyJobsItCanBeUsedToApplyTo: 10,
  variantId: variantIdRegular,
};

const variantIdBusiness = "563239";
// const variantIdBusinessTest = "563936";
const businessPlanObj = {
  planName: "Business",
  perCreditInfo: 0.005 * 2,
  planCreditsAmount: 14900,
  planPrice: 9.99,
  additionalCredits: 150,
  suitabilityTimeUsage: "more than 20",
  noOfDailyJobsItCanBeUsedToApplyTo: 20,
  variantId: variantIdBusiness,
};

const dollarPricingPlansObjArray = [
  businessPlanObj,
  regularPlanObj,
  freePlanObj,
];

export default dollarPricingPlansObjArray;
