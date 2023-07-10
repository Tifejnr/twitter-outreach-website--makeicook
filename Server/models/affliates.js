const mongoose = require("mongoose");
const Joi = require("joi");

const affliateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 40,
  },
  email: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 250,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1250,
  },
  affliateCode: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 8,
    unique: true,
  },

  weeklyEarnings: {
    type: Number,
    min: 0,
    max: 1000250,
    default: 0,
  },

  totalEarned: {
    type: Number,
    min: 0,
    max: 100000000,
    default: 0,
  },
});

const affliate = mongoose.model("affliates", affliateSchema);

async function updateAffliateAmount(updateAffliateParams) {
  const affliateFeesNow = updateAffliateParams.affliateFeesNow;
  const threeLettersEntryCode = updateAffliateParams.threeLettersEntryCode;
  const affliateMember = await affliate.findOne({
    affliateCode: threeLettersEntryCode,
  });
  if (!affliateMember)
    return res
      .status(400)
      .json({ noAffliateFound: "No Affliate with this affliate code exist" });
  const previousWeeklyEarned = affliateMember.weeklyEarnings;
  newWeeklyEarning = previousWeeklyEarned + affliateFeesNow;
  affliateMember.weeklyEarnings = newWeeklyEarning;

  const previousTotalEarned = affliateMember.totalEarned;
  newTotalEarned = previousTotalEarned + affliateFeesNow;
  affliateMember.totalEarned = newTotalEarned;

  const affliateEarningsObj = {
    weeklyEarnings: affliateMember.weeklyEarnings.toFixed(2),
    totalEarned: affliateMember.totalEarned.toFixed(2),
    affliateEmail: affliateMember.email,
  };

  const saveAffliateMemver = await affliateMember.save();

  if (saveAffliateMemver) return affliateEarningsObj;
}

exports.affliate = affliate;
exports.updateAffliateAmount = updateAffliateAmount;
