const express = require("express");
const cors = require("cors");
const path = require("path");
const ejs = require("ejs");
const coookieParser = require("cookie-parser");
const app = express();
const session = require("express-session");
const { addMemberToBoard } = require("./utilis/boards/add");
const { fetchAllBoards } = require("./utilis/boards/fetchBoards");
const { login } = require("./utilis/oauth/oauth-and-callback");
const { callback } = require("./utilis/oauth/oauth-and-callback");
const { deleteMemberFromBoard } = require("./utilis/boards/delete");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "/root/Frontend/dist")));

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(
      __dirname,
      "/root/Frontend/dist",
      "/root/Frontend/dist/index.html"
    )
  );
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../Frontend/public/views"));

// Routes Handling Section
// app.get("/", async (req, res) => {
//   res.render("trelloAdd");
// });

app.get("/login", async (req, res) => {
  res.render("login");
});

app.get("/authorize", async (req, res) => {
  login(req, res);
});

// app.post("/login", async (req, res) => {
//   login(req, res);
// });

app.get("/callback", async (req, res) => {
  callback(req, res);
});

app.post("/start", async (req, res) => {
  fetchAllBoards(req, res);
});

app.post("/add", async (req, res) => {
  addMemberToBoard(req, res);
});

app.post("/delete", async (req, res) => {
  deleteMemberFromBoard(req, res);
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
