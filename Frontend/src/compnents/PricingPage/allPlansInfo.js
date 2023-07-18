import paperPlanePic from "../../assets/SVGs/paper-plane.svg";
import aeroplanePic from "../../assets/SVGs/aeroplane.svg";
import spaceshipPic from "../../assets/SVGs/spaceship.svg";

const basicPlanObj = {
  planPic: paperPlanePic,
  suitabilityTimeUsage: 5,
  planCreditsAmount: 10,
};

const standardPlanObj = {
  planPic: aeroplanePic,
  suitabilityTimeUsage: 20,
  planCreditsAmount: 50,
};

const PremiumPlanObj = {
  planPic: spaceshipPic,
  suitabilityTimeUsage: 100,
  planCreditsAmount: 230,
};

export const allPricingPlansObjArray = [
  basicPlanObj,
  standardPlanObj,
  PremiumPlanObj,
];
