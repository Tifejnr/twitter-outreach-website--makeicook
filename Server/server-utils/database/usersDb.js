import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  entryCode: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 40,
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  paidFor: {
    type: String,
    minlength: 2,
    maxlength: 1250,
    default: "NA",
  },

  profileLink: {
    type: String,
    maxlength: 1000,
    default: "NA",
  },

  jobsCompleted: {
    type: Number,
    max: 15,
    min: 0,
    default: 0,
  },

  jobsToBeCompleted: {
    type: Number,
    min: 0,
    default: 0,
  },

  credits: {
    type: Number,
    min: 0,
    default: 0,
  },

  noOfTimesUsedAllTime: {
    type: Number,
    min: 0,
    default: 0,
  },

  noOfTimesUsedDailyOnly: {
    type: Number,
    min: 0,
    default: 0,
  },

  totalNoOfPossibleUsageIfUsedDailyOnly: {
    type: Number,
    min: 0,
    default: 0,
  },

  lastFiveUsedDates: {
    type: [String], // Changed to an array of strings
    default: [], // Default as an empty array
  },

  hasItBeenUsedToday: {
    type: Boolean,
    default: false,
  },
});

const user = mongoose.models.User || mongoose.model("User", userSchema);

export default user;
