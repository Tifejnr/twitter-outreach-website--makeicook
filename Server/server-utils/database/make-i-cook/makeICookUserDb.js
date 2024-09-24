import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  homeConsistencyRating: {
    type: Number,
    required: true,
  },
  awayConsistencyRating: {
    type: Number,
    required: true,
  },
});

const influencerPredictionsSchema = new mongoose.Schema({
  homeTeamName: {
    type: String,
    required: true,
  },
  awayTeamName: {
    type: String,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  tournamentName: {
    type: String,
    required: true,
  },
  matchTime: {
    type: String,
    required: true,
  },
  tournamentShortCode: {
    type: String,
    required: true,
  },
});

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

  role: {
    type: String,
    minlength: 2,
    maxlength: 1250,
    default: "User",
  },

  credits: {
    type: Number,
    min: 0,
    default: 0,
  },

  favoriteTeams: {
    type: [teamSchema],
    default: [],
  },

  influencerPredictions: {
    type: [influencerPredictionsSchema],
    default: [],
  },
});

const userMakeICook =
  mongoose.models.User || mongoose.model("User", userSchema);

export default userMakeICook;
