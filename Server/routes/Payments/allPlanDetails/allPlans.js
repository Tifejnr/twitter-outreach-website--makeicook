const { basicPlanObj } = require("./basic");
const { standardPlanObj } = require("./standard");
const { PremiumPlanObj } = require("./premium");

const allPlansArrayObj = [basicPlanObj, standardPlanObj, PremiumPlanObj];

exports.allPlansArrayObj = allPlansArrayObj;
