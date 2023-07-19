import paperPlanePic from "../../assets/SVGs/paper-plane.svg";
import aeroplanePic from "../../assets/SVGs/aeroplane.svg";
import spaceshipPic from "../../assets/SVGs/spaceship.svg";
const basicPaymentLink = `https://upwork-client-conversation-aid-subscription.lemonsqueezy.com/checkout/buy/ed30d3e6-1e46-4a64-9adc-fb6de1b5362f?desc=0&discount=0&dark=1`;
const standardPaymentLink = `https://upwork-client-conversation-aid-subscription.lemonsqueezy.com/checkout/buy/ed30d3e6-1e46-4a64-9adc-fb6de1b5362f?desc=0&discount=0&dark=1`;
const premiumPaymentLink = `https://upwork-client-conversation-aid-subscription.lemonsqueezy.com/checkout/buy/ed30d3e6-1e46-4a64-9adc-fb6de1b5362f?desc=0&discount=0&dark=1`;

const basicPlanObj = {
  planName: "Basic",
  planPic: paperPlanePic,
  suitabilityTimeUsage: 20,
  planCreditsAmount: 10,
  planPrice: 4.99,
  paymentLink: basicPaymentLink,
  choiceIndcator: true,
};

const standardPlanObj = {
  planName: "Standard",
  planPic: aeroplanePic,
  suitabilityTimeUsage: 20,
  planCreditsAmount: 50,
  paymentLink: standardPaymentLink,
  planPrice: 19,
};

const PremiumPlanObj = {
  planName: "Premium",
  planPic: spaceshipPic,
  suitabilityTimeUsage: 100,
  planCreditsAmount: 230,
  paymentLink: premiumPaymentLink,
  planPrice: 49,
};

export const allPricingPlansObjArray = [
  basicPlanObj,
  standardPlanObj,
  PremiumPlanObj,
];
