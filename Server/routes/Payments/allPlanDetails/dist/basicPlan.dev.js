"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allPricingPlansObjArray = void 0;
var basicPlanObj = {
  planName: "Basic",
  planPrice: 4.99
};
var standardPlanObj = {
  planName: "Standard",
  planPic: aeroplanePic,
  suitabilityTimeUsage: 20,
  planCreditsAmount: 100,
  planPrice: 19
};
var PremiumPlanObj = {
  planName: "Premium",
  planPic: spaceshipPic,
  suitabilityTimeUsage: 100,
  planCreditsAmount: 460,
  planPrice: 49
};
var allPricingPlansObjArray = [basicPlanObj, standardPlanObj, PremiumPlanObj];
exports.allPricingPlansObjArray = allPricingPlansObjArray;