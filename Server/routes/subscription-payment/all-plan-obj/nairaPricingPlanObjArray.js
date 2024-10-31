const freePlanObj = {
  planName: "Free",
  perCreditInfo: 0.25,
  planCreditsAmount: 0,
  planPrice: 0,
  suitabilityTimeUsage: "",
  naira: true,
  howLongWillItTakeToExhaust: "",
  noOfDailyJobsItCanBeUsedToApplyTo: 0,
};

const regularPlanObj = {
  planName: "Regular",
  perCreditInfo: 10 * 2,
  planCreditsAmount: 3000,
  planPrice: 4900,
  suitabilityTimeUsage: "less than 10",
  naira: true,
  noOfDailyJobsItCanBeUsedToApplyTo: 12,
};

const businessPlanObj = {
  planName: "Business",
  perCreditInfo: 7 * 2,
  planCreditsAmount: 14900,
  planPrice: 14900,
  suitabilityTimeUsage: "more than 20",
  naira: true,
  additionalCredits: 7,
  noOfDailyJobsItCanBeUsedToApplyTo: 20,
};

const nairaPricingPlansObjArray = [
  businessPlanObj,
  regularPlanObj,
  freePlanObj,
];

export default nairaPricingPlansObjArray;
