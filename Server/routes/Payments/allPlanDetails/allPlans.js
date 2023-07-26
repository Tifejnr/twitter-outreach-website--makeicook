const { basicPlanObj } = require("./basic");

const standardPlanObj = {
  planName: "Standard",
  planPrice: 19,
  credits: 110,
};

const PremiumPlanObj = {
  planName: "Premium",
  planPrice: 49,
  credits: 500,
};

const allPlansObj = {
  basicPlanObj,
  standardPlanObj,
  PremiumPlanObj,
};

exports.allPlansObj = allPlansObj;
