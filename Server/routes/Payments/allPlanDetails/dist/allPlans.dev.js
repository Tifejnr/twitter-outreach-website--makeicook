"use strict";

var _require = require("./basic"),
    basicPlanObj = _require.basicPlanObj;

var _require2 = require("./standard"),
    standardPlanObj = _require2.standardPlanObj;

var _require3 = require("./premium"),
    PremiumPlanObj = _require3.PremiumPlanObj;

var allPlansArrayObj = [basicPlanObj, standardPlanObj, PremiumPlanObj];
exports.allPlansArrayObj = allPlansArrayObj;