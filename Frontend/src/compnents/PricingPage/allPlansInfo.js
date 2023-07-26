import paperPlanePic from "../../assets/SVGs/paper-plane.svg";
import aeroplanePic from "../../assets/SVGs/aeroplane.svg";
import spaceshipPic from "../../assets/SVGs/spaceship.svg";

const basicPlanObj = {
  planName: "Basic",
  planPic: paperPlanePic,
  suitabilityTimeUsage: 20,
  planCreditsAmount: 20,
  planPrice: 4.99,
  choiceIndcator: true,
};

const standardPlanObj = {
  planName: "Standard",
  planPic: aeroplanePic,
  suitabilityTimeUsage: 20,
  planCreditsAmount: 110,
  planPrice: 19,
};

const PremiumPlanObj = {
  planName: "Premium",
  planPic: spaceshipPic,
  suitabilityTimeUsage: 100,
  planCreditsAmount: 500,
  planPrice: 49,
};

export const allPricingPlansObjArray = [
  basicPlanObj,
  standardPlanObj,
  PremiumPlanObj,
];
