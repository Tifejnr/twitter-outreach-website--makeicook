const freePlanObj = {
  planName: "Free",
  perCreditInfo: 0.25,
  planCreditsAmount: 0,
  planPrice: 0,
  suitabilityTimeUsage: "",
  noOfDailyJobsItCanBeUsedToApplyTo: 0,
};

const basicPlanObj = {
  planName: "Standard",
  perCreditInfo: 0.008,
  planCreditsAmount: 3000,
  planPrice: 3.99,
  suitabilityTimeUsage: "less than 10",
  noOfDailyJobsItCanBeUsedToApplyTo: 10,
};

const standardPlanObj = {
  planName: "Business",
  perCreditInfo: 0.005,
  planCreditsAmount: 14900,
  planPrice: 9.99,
  additionalCredits: 150,
  suitabilityTimeUsage: "more than 20",
  noOfDailyJobsItCanBeUsedToApplyTo: 20,
};

const dollarPricingPlansObjArray = [freePlanObj, basicPlanObj, standardPlanObj];

export default dollarPricingPlansObjArray;
