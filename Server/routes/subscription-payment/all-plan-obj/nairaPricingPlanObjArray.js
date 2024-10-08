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

const basicPlanObj = {
  planName: "Standard",
  perCreditInfo: 10,
  planCreditsAmount: 3000,
  planPrice: 4900,
  suitabilityTimeUsage: "less than 10",
  naira: true,
  noOfDailyJobsItCanBeUsedToApplyTo: 10,
};

const standardPlanObj = {
  planName: "Business",
  perCreditInfo: 7,
  planCreditsAmount: 14900,
  planPrice: 14900,
  suitabilityTimeUsage: "more than 20",
  naira: true,
  additionalCredits: 7,
  noOfDailyJobsItCanBeUsedToApplyTo: 20,
};

const nairaPricingPlansObjArray = [freePlanObj, basicPlanObj, standardPlanObj];

export default nairaPricingPlansObjArray;
