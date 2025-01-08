const freePlanObj = {
  planName: "Free",
  perCreditInfo: "",
  planDailyMessageLimit: 5,
  planPrice: 0.0,
  suitabilityTimeUsage: "just for testing",
};

const variantIdBusiness = "654433";
// const variantIdBusinessTest = "654471";

const businessPlanObj = {
  planName: "Business",
  planDailyMessageLimit: 500,
  planPrice: 20,
  suitabilityTimeUsage: "for selling products or services",
  variantId: variantIdBusiness,
};

const variantIdLargeScale = "654438";
// const variantIdLargeScaleTest = "654499";

const largeScalePlanObj = {
  planName: "Large Scale",
  planDailyMessageLimit: 3000,
  planPrice: 80,
  suitabilityTimeUsage: "for selling products or services on a large scale",
  variantId: variantIdLargeScale,
};

const allPricingPlansObj = [freePlanObj, businessPlanObj, largeScalePlanObj];

export default allPricingPlansObj;
