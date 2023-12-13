const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const ejs = require("ejs");
const coookieParser = require("cookie-parser");
const app = express();
const { HfInference } = require("@huggingface/inference");

// functions boards
const { addMemberToBoard } = require("./utilis/boards/add");
const { deleteMemberFromBoard } = require("./utilis/boards/delete");
const { fetchAllBoards } = require("./utilis/boards/fetchBoards");
const { findMemberId } = require("./utilis/boards/getMemberId/idFromUsername");

//functions oauth
const { login } = require("./utilis/oauth/oauth-and-callback");
const { callback } = require("./utilis/oauth/oauth-and-callback");

//functions workspaces
const { getWorkspaceName } = require("./utilis/workspaces/workspacesNames");
require("dotenv").config();
require("./startup/prod")(app);

//utils functions
const { getKeys } = require("./envKeys/allKeys");
const keysObjects = getKeys();
const loginStatusChecker = require("./middlewares/jwt-related/login-status-checker");
const signatureChecker = require("./middlewares/signature/checkSignature");
const userToken = require("./middlewares/token-safety/decryptToken");
const isUserAuthorized = require("./middlewares/jwt-related/authorizedUserVerification");

//webhooks set here so req.body does not get parsed into json before reaching the route. raw body is needed
const webhooks = require("./routes/Payments/webhooks");

app.use("/api/webhooks", webhooks);
const webhookCallbackUrl = "https://www.collabfortrello.com/api/webhooks";

//Connect to mong db
const mongoDB_string = keysObjects.mongoDB_string;
mongoose
  .connect(mongoDB_string)
  .then(() => {
    console.log("connected to mong db");
  })
  .catch((err) => console.error("could not connect", err));

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(coookieParser());

//Importing api routes
const registerUser = require("./routes/register-users");
const signInUser = require("./routes/auth");
const paymentsHandling = require("./routes/Payments/checkout");
const dashboard = require("./routes/dashboard");
const forgotPassword = require("./routes/forgot-password");
// const saveOureachDetails = require("./routes/outreach-server/saveOutreachDetails");
const getClientNameFromTestimonials = require("./routes/ai-responses/getClientName/getClientName");

//api routes declaarations
app.use("/api/register-user", registerUser);
app.use("/api/extension-sign-in", signInUser);
app.use("/api/forgot-password", forgotPassword);
app.use("/api/dashboard", loginStatusChecker, isUserAuthorized, dashboard);
app.use("/api/checkout", loginStatusChecker, paymentsHandling);
app.use("/api/checkout/webhooks", webhooks);
// app.use("/api/get-client-name", getClientNameFromTestimonials);
// app.use("/api/save-outreach-details", saveOureachDetails);
app.use(
  express.static(
    path.join(__dirname, "../../Trello-Project-React/Frontend/dist")
  )
);

app.set("view engine", "ejs");
app.set(
  "views",
  path.join(__dirname, "../../Trello-Project-React/Frontend/public/views")
);

//Won't be accessible by React route, callback during app authorization. server owns this route
app.get("/callback", async (req, res) => {
  callback(req, res);
});

// Routes Handling Section
app.post("/isloggedIn", loginStatusChecker, async (req, res) => {
  res.json({ loggedIn: true });
});

app.post(
  "/is-account-authorized",
  [loginStatusChecker, isUserAuthorized],
  async (req, res) => {
    res.json({ authorized: true, userCredits, extensionLoginDetails });
  }
);

// app.get("/check-cookie", (req, res) => {
//   const tokenCheck = req.cookies.cftAuth;
//   console.log(tokenCheck);
// });

app.post("/authorize", async (req, res) => {
  login(req, res);
});

app.post(
  "/start",
  [loginStatusChecker, isUserAuthorized, userToken],
  async (req, res) => {
    fetchAllBoards(req, res);
  }
);

app.post(
  "/add",
  [loginStatusChecker, isUserAuthorized, userToken, signatureChecker],
  async (req, res) => {
    addMemberToBoard(req, res);
  }
);

app.post(
  "/find-member-id",
  [loginStatusChecker, isUserAuthorized, userToken, signatureChecker],
  async (req, res) => {
    await findMemberId(req, res);
  }
);

app.post(
  "/delete-from-boards",
  [loginStatusChecker, isUserAuthorized, userToken, signatureChecker],
  async (req, res) => {
    deleteMemberFromBoard(req, res);
  }
);

//workspaces routes
app.post(
  "/get-workspace-name",
  [loginStatusChecker, isUserAuthorized, userToken, signatureChecker],
  async (req, res) => {
    getWorkspaceName(req, res);
  }
);

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
