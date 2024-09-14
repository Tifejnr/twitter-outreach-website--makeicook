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
// import sendMailToMultipleUsers from "./routes/(customer-requests)/email-users/route.js";
// sendMailToMultipleUsers();

//Connect to mong db
(async () => {
  await getMongoKeyAndConnect();
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

//api routes declaarations
app.use("/api/users", validateOrigin, signUpRouter);
app.use("/api/auth", validateOrigin, signInRouter);
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
