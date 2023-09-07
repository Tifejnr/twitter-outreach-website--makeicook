const basicPlanObj = {
  planName: "Basic",
  perCreditInfo: 0.25,
  planCreditsAmount: 20,
  planPrice: 4.99,
  choiceIndcator: true,
};

const standardPlanObj = {
  planName: "Standard",
  perCreditInfo: 0.2,
  planCreditsAmount: 100,
  planPrice: 19,
};

const PremiumPlanObj = {
  planName: "Premium",
  perCreditInfo: 0.16,
  planCreditsAmount: 310,
  planPrice: 49,
};

export const allPricingPlansObjArray = [
  basicPlanObj,
  standardPlanObj,
  PremiumPlanObj,
];
