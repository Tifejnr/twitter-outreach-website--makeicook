const freePlanObj = {
  planName: "Free",
  perCreditInfo: "",
  planDailyMessageLimit: 5,
  planPrice: 0.0,
  suitabilityTimeUsage: "just for testing",
};

const variantIdBusiness = "563237";
const variantIdBusinessTest = "654471";

const businessPlanObj = {
  planName: "Business",
  planDailyMessageLimit: 500,
  planPrice: 20,
  suitabilityTimeUsage: "for selling products or services",
  variantId: variantIdBusinessTest ? variantIdBusinessTest : variantIdBusiness,
};

const variantIdLargeScale = "563239";
const variantIdLargeScaleTest = "654499";

const largeScalePlanObj = {
  planName: "Large Scale",
  planDailyMessageLimit: 3000,
  planPrice: 80,
  suitabilityTimeUsage: "for selling products or services on a large scale",
  variantId: variantIdLargeScaleTest
    ? variantIdLargeScaleTest
    : variantIdLargeScale,
};

const allPricingPlansObj = [freePlanObj, businessPlanObj, largeScalePlanObj];

export default allPricingPlansObj;
