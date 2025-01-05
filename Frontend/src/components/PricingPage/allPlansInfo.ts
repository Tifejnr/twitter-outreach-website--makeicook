const basicPlanObj = {
  planName: "Free",
  perCreditInfo: "",
  planCreditsAmount: 5,
  planPrice: 0.0,
  suitabilityTimeUsage: "just for testing",
};

const standardPlanObj = {
  planName: "Business",
  perCreditInfo: 0.2,
  planCreditsAmount: 500,
  planPrice: 20,
  suitabilityTimeUsage: "for selling products or services",
};

const PremiumPlanObj = {
  planName: "Large Scale",
  perCreditInfo: 0.16,
  planCreditsAmount: 3000,
  planPrice: 80,
  suitabilityTimeUsage: "for selling products or services on a large scale",
};

export const allPricingPlansObjArray = [
  basicPlanObj,
  standardPlanObj,
  PremiumPlanObj,
];
