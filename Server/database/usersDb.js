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
    max: 15,
    min: 0,
    default: 0,
  },
});

export interface AccountUserModel {
  name: string;
  email: string;
  password: string;
  entryCode: string;
  isPaid?: boolean;
  paidFor?: string;
  profileLink?: string;
  jobsCompleted?: number;
  jobsToBeCompleted?: number;
}

const user = mongoose.models.User || mongoose.model("User", userSchema);

export default user;
