const basicPlanObj = {
  planName: "Basic",
  suitabilityTimeUsage: 20,
  planCreditsAmount: 20,
  planPrice: 4.99,
  choiceIndcator: true,
};

const standardPlanObj = {
  planName: "Standard",
  suitabilityTimeUsage: 20,
  planCreditsAmount: 110,
  planPrice: 19,
};

const PremiumPlanObj = {
  planName: "Premium",
  suitabilityTimeUsage: 100,
  planCreditsAmount: 500,
  planPrice: 49,
};

export const allPricingPlansObjArray = [
  basicPlanObj,
  standardPlanObj,
  PremiumPlanObj,
];
