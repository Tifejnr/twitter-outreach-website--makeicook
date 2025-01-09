import mongoose from "mongoose";

const processingDetailOnlyArraySchema = new mongoose.Schema({
  mainQuestionToCheckCondition: {
    type: String,
    // required: true,
  },
  tweetConditionsForYesOrNoVerdictArray: {
    type: [String],
    // required: true,
  },
});

const pickedWordAndSynonymsGivenArraySchema = new mongoose.Schema({
  word: {
    type: String,
    // required: true,
  },
  synonym: {
    type: String,
    // required: true,
  },
});

const defaultTemporarilyStoredMessagingParams = {
  lastPickedObjWordsAndSynonymArray: [{ word: "", synonym: "" }],
  lastPickedObjWordsAndSynonymArrayLongerVersion: [{ word: "", synonym: "" }],
  lastPickedTemperatureForMessageSpinTax: 0.2,
  lastPickedGreatWriterName: "Brian Tracy",
};

const TemporarilyStoredMessagingParamsSchema = new mongoose.Schema({
  lastPickedObjWordsAndSynonymArray: {
    type: [pickedWordAndSynonymsGivenArraySchema],
    // required: true,
  },
  lastPickedObjWordsAndSynonymArrayLongerVersion: {
    type: [pickedWordAndSynonymsGivenArraySchema],
    // required: true,
  },

  lastPickedTemperatureForMessageSpinTax: {
    type: Number,
    // required: true,
  },
  lastPickedGreatWriterName: {
    type: String,
    // required: true,
  },
  // lastPickedWriterName: {
  //   type: String,
  //   // required: true,
  // },
});
const aiChattingConfigArraySchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  condition: {
    type: String,
    // required: true,
  },
  responseIftrue: {
    type: String,
    // required: true,
  },
  myLastSentMessageFormat: {
    type: String,
    // required: true,
  },
});

const replyTemplateArraySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  text: {
    type: String,
    // required: true,
  },
});
const sheetObjArraySchema = new mongoose.Schema({
  sheetName: {
    type: String,
    // required: true,
  },
  sheetLink: {
    type: String,
    // required: true,
  },
  sheetId: {
    type: String,
    // required: true,
  },
  serviceAccountCredentials: {
    type: Object, // Correct type for storing JSON-like objects
    // required: true,
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

  temporarillyStoredMessageSpinTaxParams: {
    type: TemporarilyStoredMessagingParamsSchema,
    default: defaultTemporarilyStoredMessagingParams,
  },

  replyTemplateArray: {
    type: [replyTemplateArraySchema],
    default: [],
  },

  processingDetailOnlyArray: {
    type: [processingDetailOnlyArraySchema],
    default: [],
  },

  sheetObjArray: {
    type: [sheetObjArraySchema],
    default: [],
  },

  aiChattingConfigArray: {
    type: [aiChattingConfigArraySchema],
    default: [],
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

  noOfMessagesSentToday: {
    type: Number,
    min: 0,
    default: 0,
  },

  noOfTimesUsedAllTime: {
    type: Number,
    min: 0,
    default: 0,
  },

  allTimeNoOfMessagesSent: {
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

  fromMakeICookExtension: {
    type: Boolean,
    default: false,
  },
});

const user = mongoose.models.User || mongoose.model("User", userSchema);

export default user;
