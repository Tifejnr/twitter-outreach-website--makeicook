"use strict";

var _require = require("./basic"),
    basicPlanObj = _require.basicPlanObj;

var standardPlanObj = {
  planName: "Standard",
  planPrice: 19,
  credits: 110
};
var PremiumPlanObj = {
  planName: "Premium",
  planPrice: 49,
  credits: 500
};
var allPlansObj = {
  basicPlanObj: basicPlanObj,
  standardPlanObj: standardPlanObj,
  PremiumPlanObj: PremiumPlanObj
};
exports.allPlansObj = allPlansObj;