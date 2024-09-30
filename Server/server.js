import cron from "node-cron";
import express from "express";
import getMongoKeyAndConnect from "./server-utils/database/mongoDbConnect.js";
import cors from "cors";
import exppressLimiter from "express-limit";
import path from "path";
import { fileURLToPath } from "url";

import coookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(coookieParser());

import setupMiddleware from "./startup/prod.js";
setupMiddleware(app);

//routers importing
import signInRouter from "./routes/(auth)/auth/route.js";
import signUpRouter from "./routes/(auth)/users/route.js";
import forgotPasswordRouter from "./routes/(auth)/forgot-password/route.js";
import resetPasswordRouter from "./routes/(auth)/forgot-password/reset-password/route.js";
import getClientNameRouter from "./routes/(ai-related)/get-client-name/route.js";
import isAccountAuthorizedRouter from "./routes/(auth)/is-account-authorized/route.js";
import wfrOutreachRecordingRouter from "./routes/(ai-related)/wfr-outreach-details/route.js";
import chatGPTAIResponseRouter from "./routes/(ai-related)/ChatGBT/route.js";
import contactUsHandlerWebsiteRouter from "./routes/(customer-requests)/contact-us/route.js";
import handlerExtensionRequestRouter from "./routes/(customer-requests)/handle-extension-request/route.js";
import validateOrigin from "./server-utils/middleware/is-origin-valid/isOriginValid.js";
import getNameRouterToPersonalizeDmRouter from "./routes/(ai-related)/get-name-to-personalize-DM/route.js";
// import makeIcookMongConnect from "./server-utils/database/make-i-cook/makeIcookMongConnect.js";
import signInMakeICookRouter from "./routes/(auth)/make-i-cook-part/login/signInUser.js";
import signUpMakeICookRouter from "./routes/(auth)/make-i-cook-part/sign-up/signUp.js";
import isAccountAuthorizedMakeICookRouter from "./routes/(auth)/make-i-cook-part/is-account-authorized/isAccountAuthorized.js";
import sendEmailVerificationCodeRouter from "./routes/(auth)/verify-email/sendVerificationCodeToUser.js";
import resetStatsBy12AmDaily from "./routes/(auth)/users-stats/reset-stats-daily/resetStatsBy12AmDaily.js";
import userStatsRouter from "./routes/(auth)/users-stats/userStats.js";

// import sendMailToMultipleUsers from "./routes/(customer-requests)/email-users/route.js";
// sendMailToMultipleUsers();

// Runs at 12:00 AM every day (Nigerian time, UTC+1)
cron.schedule("0 0 * * *", () => {
  resetStatsBy12AmDaily();
});

//Connect to mong db
(async () => {
  await getMongoKeyAndConnect();

  // setTimeout(async () => {
  //   await makeIcookMongConnect();
  // }, 3000);
})();

const limiter = exppressLimiter.limit;

const limiterOptions = {
  windows: 4000,
  max: 12,
};

const rateLimitRoute = limiter(limiterOptions);

//limiter on routes
// app.use(limiter(limiterOptions));
// Apply validateOrigin middleware globally
// app.use(validateOrigin);

//api routes declaarations makeICook
app.use("/api/sign-up-mic", signUpMakeICookRouter);
app.use("/api/sign-in-mic", signInMakeICookRouter);
app.use("/is-account-authorized-mic", isAccountAuthorizedMakeICookRouter);

//api routes declarations
app.use(
  "/api/new-user-sign-up",
  validateOrigin,
  sendEmailVerificationCodeRouter
);
app.use("/api/users", validateOrigin, signUpRouter);
app.use("/api/auth", validateOrigin, signInRouter);
app.use("/api/process-usage", validateOrigin, userStatsRouter);
app.use("/api/forgot-password", validateOrigin, forgotPasswordRouter);
app.use(
  "/api/forgot-password/reset-password",
  validateOrigin,
  resetPasswordRouter
);
app.use(
  "/api/get-client-name",
  [validateOrigin, rateLimitRoute],
  getClientNameRouter
);
app.use(
  "/api/is-account-authorized",
  validateOrigin,

  isAccountAuthorizedRouter
);
app.use("/is-account-authorized", validateOrigin, isAccountAuthorizedRouter);
app.use(
  "/api/wfr-outreach-details",
  validateOrigin,
  wfrOutreachRecordingRouter
);
app.use(
  "/api/get-name-for-dm-personalization",
  validateOrigin,
  getNameRouterToPersonalizeDmRouter
);
app.use("/api/ChatGBT", validateOrigin, chatGPTAIResponseRouter);
app.use("/api/contact-us", validateOrigin, contactUsHandlerWebsiteRouter);
app.use(
  "/api/handle-extension-request",
  validateOrigin,
  handlerExtensionRequestRouter
);

app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.set("views", path.join(__dirname, "../Frontend/public/views"));

//reaeact routes connection

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});

`
1. View words clients see first in your cover letter so you can strategically optimize your opening lines, increasing your chances of getting your proposals viewed and landing more getting hired.
2. Automatic retrieval of client names from feedback history to save you valuable time and effort of searching through the feedbacks to before getting the client name.  Notifies you if there are multiple names in the feedback and if there are no names found.
3. Summary of how it's like working with a client based on previous freelancers feedback, to give you more insight to who a client really is, and if they are someone you want to work with or not.
4. Save texts template to reuse(copy) them while writing cover letters eliminating repetitive typing and saving time.Text templates you can save range from cover letter templates to project links that you reference often to cover letter closing remark etc.  
5. Job post directly above your cover letter input box ensuring you don't have to scroll upwards to reference information on job post again.

`;
