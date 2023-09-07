"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allPricingPlansObjArray = void 0;
var basicPlanObj = {
  planName: "Basic",
  perCreditInfo: 0.25,
  planCreditsAmount: 20,
  planPrice: 4.99,
  choiceIndcator: true
};
var standardPlanObj = {
  planName: "Standard",
  perCreditInfo: 0.2,
  planCreditsAmount: 100,
  planPrice: 19
};
var PremiumPlanObj = {
  planName: "Premium",
  perCreditInfo: 0.16,
  planCreditsAmount: 310,
  planPrice: 49
};
var allPricingPlansObjArray = [basicPlanObj, standardPlanObj, PremiumPlanObj];
exports.allPricingPlansObjArray = allPricingPlansObjArray;