import express from "express";
import getMongoKeyAndConnect from "./server-utils/database/mongoDbConnect.js";
import cors from "cors";
import path from "path";
import coookieParser from "cookie-parser";
const app = express();

import setupMiddleware from "./startup/prod.js";

setupMiddleware(app);

//Connect to mong db

(async () => {
  await getMongoKeyAndConnect();
})();

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(coookieParser());

//Importing api routes
// const registerUser = require("./routes/register-users");
// const signInUser = require("./routes/auth");
// const paymentsHandling = require("./routes/Payments/checkout");
// const dashboard = require("./routes/dashboard");
// const forgotPassword = require("./routes/forgot-password");
// const saveOureachDetails = require("./routes/outreach-server/saveOutreachDetails");
// const getClientNameFromTestimonials = require("./routes/ai-responses/getClientName/getClientName");

//api routes declaarations
// app.use("/api/register-user", registerUser);
// app.use("/api/extension-sign-in", signInUser);
// app.use("/api/forgot-password", forgotPassword);
// app.use("/api/dashboard", loginStatusChecker, isUserAuthorized, dashboard);
// app.use("/api/checkout", loginStatusChecker, paymentsHandling);
// app.use("/api/checkout/webhooks", webhooks);
// app.use("/api/get-client-name", getClientNameFromTestimonials);
// app.use("/api/save-outreach-details", saveOureachDetails);
// app.use(
//   express.static(
//     path.join(__dirname, "../../Trello-Project-React/Frontend/dist")
//   )
// );

// app.set(
//   "views",
//   path.join(__dirname, "../../Trello-Project-React/Frontend/public/views")
// );

// Routes Handling Section
// app.post("/isloggedIn", loginStatusChecker, async (req, res) => {
//   res.json({ loggedIn: true });
// });

// app.post(
//   "/is-account-authorized",
//   [loginStatusChecker, isUserAuthorized],
//   async (req, res) => {
//     res.json({ authorized: true, userCredits, extensionLoginDetails });
//   }
// );

// app.get("/check-cookie", (req, res) => {
//   const tokenCheck = req.cookies.cftAuth;
//   console.log(tokenCheck);
// });

// app.post("/authorize", async (req, res) => {
//   login(req, res);
// });

// app.post(
//   "/start",
//   [loginStatusChecker, isUserAuthorized, userToken],
//   async (req, res) => {
//     fetchAllBoards(req, res);
//   }
// );

// app.post(
//   "/add",
//   [loginStatusChecker, isUserAuthorized, userToken, signatureChecker],
//   async (req, res) => {
//     addMemberToBoard(req, res);
//   }
// );

// app.post(
//   "/find-member-id",
//   [loginStatusChecker, isUserAuthorized, userToken, signatureChecker],
//   async (req, res) => {
//     await findMemberId(req, res);
//   }
// );

// app.post(
//   "/delete-from-boards",
//   [loginStatusChecker, isUserAuthorized, userToken, signatureChecker],
//   async (req, res) => {
//     deleteMemberFromBoard(req, res);
//   }
// );

// //workspaces routes
// app.post(
//   "/get-workspace-name",
//   [loginStatusChecker, isUserAuthorized, userToken, signatureChecker],
//   async (req, res) => {
//     getWorkspaceName(req, res);
//   }
// );

//reaeact routes connection

app.get("*", function (req, res) {
  res.sendFile(
    path.join(
      __dirname,
      "../../Trello-Project-React/Frontend/dist",
      "index.html"
    )
  );
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
