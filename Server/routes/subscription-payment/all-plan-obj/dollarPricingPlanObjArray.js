const freePlanObj = {
  planName: "Free",
  perCreditInfo: 0.25,
  planCreditsAmount: 0,
  planPrice: 0,
  suitabilityTimeUsage: "",
  naira: false,
  howLongWillItTakeToExhaust: "",
  noOfDailyJobsItCanBeUsedToApplyTo: 0,
};

const basicPlanObj = {
  planName: "Standard",
  perCreditInfo: 5,
  planCreditsAmount: 3000,
  planPrice: 4900,
  suitabilityTimeUsage: "less than 10",
  naira: false,
  howLongWillItTakeToExhaust: "3 months",
  noOfDailyJobsItCanBeUsedToApplyTo: 10,
};

const standardPlanObj = {
  planName: "Business",
  perCreditInfo: 3,
  planCreditsAmount: 14900,
  planPrice: 14900,
  suitabilityTimeUsage: "more than 20",
  naira: false,
  howLongWillItTakeToExhaust: "8 months",
  noOfDailyJobsItCanBeUsedToApplyTo: 20,
};

const dollarPricingPlansObjArray = [freePlanObj, basicPlanObj, standardPlanObj];

export default dollarPricingPlansObjArray;
