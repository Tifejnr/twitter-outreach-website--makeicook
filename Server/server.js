const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const ejs = require("ejs");
const coookieParser = require("cookie-parser");
const app = express();

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

const { getKeys } = require("./envKeys/allKeys");
const loginStatusChecker = require("./middlewares/jwt-related/login-status-checker");
const signatureChecker = require("./middlewares/signature/checkSignature");
const userToken = require("./middlewares/token-safety/decryptToken");
const isUserAuthorized = require("./middlewares/jwt-related/authorizedUserVerification");

//webhooks set here so req.body does not get parsed into json before reaching the route. raw body is needed
const webhooks = require("./routes/Payments/webhooks");
app.use("/api/checkout/webhooks", webhooks);

//Connect to mong db
const keysObjects = getKeys();
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

//api routes declaarations
app.use("/api/register-user", registerUser);
app.use("/api/sign-in", signInUser);
app.use("/api/forgot-password", forgotPassword);
app.use("/api/dashboard", loginStatusChecker, isUserAuthorized, dashboard);
app.use("/api/checkout", loginStatusChecker, paymentsHandling);
app.use("/api/checkout/webhooks", webhooks);
app.use(
  express.static(
    path.join(__dirname, "../../Trello-Project-React/Frontend/dist")
  )
);

//Won't be accessible by React route, server owns this route
app.get("/callback", loginStatusChecker, async (req, res) => {
  callback(req, res);
});

app.get("*", function (req, res) {
  res.sendFile(
    path.join(
      __dirname,
      "../../Trello-Project-React/Frontend/dist",
      "index.html"
    )
  );
});

// app.set("view engine", "ejs");
// app.set(
//   "views",
//   path.join(__dirname, "../../Trello-Project-React/Frontend/views")
// );

// Routes Handling Section

app.post("/isloggedIn", loginStatusChecker, async (req, res) => {
  res.json({ loggedIn: true });
});

app.get("/set-cookie", (req, res) => {
  res.cookie("myCookieName", "cookieValue", { maxAge: 900000, httpOnly: true });
  res.send("Cookie set successfully!");
});

app.post(
  "/is-account-authorized",
  [loginStatusChecker, isUserAuthorized],
  async (req, res) => {
    res.json({ authorized: true, userCredits });
  }
);

app.post("/authorize", loginStatusChecker, async (req, res) => {
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

app.listen(3000, function () {
  console.log("Listening on port 3000");
});

`
He is a Gem of a person. Very humble, responsible, quite flexible and cooperative. He does what he commits. We are taking a small break with the project but will not hesitate to reach out again in the near future. 
Don't hesitate in hiring him. Hopefully, we will work again together. 
I wish him all the best for his future
`;
