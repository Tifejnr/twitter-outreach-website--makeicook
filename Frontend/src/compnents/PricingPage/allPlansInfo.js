import paperPlanePic from "../../assets/SVGs/paper-plane.svg";
import aeroplanePic from "../../assets/SVGs/aeroplane.svg";
import spaceshipPic from "../../assets/SVGs/spaceship.svg";

const basicPlanObj = {
  planName: "Basic",
  planPic: paperPlanePic,
  suitabilityTimeUsage: 20,
  planCreditsAmount: 10,
  planPrice: 5,
  choiceIndcator: true,
};

const standardPlanObj = {
  planName: "Standard",
  planPic: aeroplanePic,
  suitabilityTimeUsage: 20,
  planCreditsAmount: 50,
  planPrice: 20,
};

const PremiumPlanObj = {
  planName: "Premium",
  planPic: spaceshipPic,
  suitabilityTimeUsage: 100,
  planCreditsAmount: 230,
  planPrice: 50,
};

export const allPricingPlansObjArray = [
  basicPlanObj,
  standardPlanObj,
  PremiumPlanObj,
];
