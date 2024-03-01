const basicPlanObj = {
  planName: "Basic",
  perCreditInfo: 0.25,
  planCreditsAmount: 20,
  planPrice: 4.99,
  suitabilityTimeUsage: "Occasional",
};

const standardPlanObj = {
  planName: "Standard",
  perCreditInfo: 0.2,
  planCreditsAmount: 100,
  planPrice: 19,
  suitabilityTimeUsage: "Frequent",
};

const PremiumPlanObj = {
  planName: "Premium",
  perCreditInfo: 0.16,
  planCreditsAmount: 310,
  planPrice: 49,
  suitabilityTimeUsage: "More Frequent",
};

export const allPricingPlansObjArray = [
  basicPlanObj,
  standardPlanObj,
  PremiumPlanObj,
];
