"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allPricingPlansObjArray = void 0;

var _paperPlane = _interopRequireDefault(require("../../assets/SVGs/paper-plane.svg"));

var _aeroplane = _interopRequireDefault(require("../../assets/SVGs/aeroplane.svg"));

var _spaceship = _interopRequireDefault(require("../../assets/SVGs/spaceship.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var basicPlanObj = {
  planName: "Basic",
  planPic: _paperPlane["default"],
  suitabilityTimeUsage: 20,
  planCreditsAmount: 20,
  planPrice: 4.99,
  choiceIndcator: true
};
var standardPlanObj = {
  planName: "Standard",
  planPic: _aeroplane["default"],
  suitabilityTimeUsage: 20,
  planCreditsAmount: 110,
  planPrice: 19
};
var PremiumPlanObj = {
  planName: "Premium",
  planPic: _spaceship["default"],
  suitabilityTimeUsage: 100,
  planCreditsAmount: 500,
  planPrice: 49
};
var allPricingPlansObjArray = [basicPlanObj, standardPlanObj, PremiumPlanObj];
exports.allPricingPlansObjArray = allPricingPlansObjArray;