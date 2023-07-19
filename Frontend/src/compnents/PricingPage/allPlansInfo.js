import paperPlanePic from "../../assets/SVGs/paper-plane.svg";
import aeroplanePic from "../../assets/SVGs/aeroplane.svg";
import spaceshipPic from "../../assets/SVGs/spaceship.svg";
const basicPaymentLink = `https://collabfortrello.lemonsqueezy.com/checkout/buy/ed30d3e6-1e46-4a64-9adc-fb6de1b5362f?discount=0&dark=1`;
const standardPaymentLink = `https://collabfortrello.lemonsqueezy.com/checkout/buy/8aaf221d-82c7-4e12-8029-36de53674e8e?discount=0&dark=1`;
const premiumPaymentLink = `https://collabfortrello.lemonsqueezy.com/checkout/buy/6da6d342-1779-4a1d-b663-6bac6cbe2201?discount=0&dark=1`;

const basicPlanObj = {
  planName: "Basic",
  planPic: paperPlanePic,
  suitabilityTimeUsage: 20,
  planCreditsAmount: 20,
  planPrice: 4.99,
  paymentLink: basicPaymentLink,
  choiceIndcator: true,
};

const standardPlanObj = {
  planName: "Standard",
  planPic: aeroplanePic,
  suitabilityTimeUsage: 20,
  planCreditsAmount: 100,
  paymentLink: standardPaymentLink,
  planPrice: 19,
};

const PremiumPlanObj = {
  planName: "Premium",
  planPic: spaceshipPic,
  suitabilityTimeUsage: 100,
  planCreditsAmount: 460,
  paymentLink: premiumPaymentLink,
  planPrice: 49,
};

export const allPricingPlansObjArray = [
  basicPlanObj,
  standardPlanObj,
  PremiumPlanObj,
];
