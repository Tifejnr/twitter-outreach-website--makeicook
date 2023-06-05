import express from "express";
import cors from "cors";
import path from "path";
// import ejs from "ejs";
import coookieParser from "cookie-parser";
import session from "express-session";
import { addMemberToBoard } from "./utilis/boards/add";
import { fetchAllBoards } from "./utilis/boards/fetchBoards";
import { login } from "./utilis/oauth/oauth-and-callback";
import { callback } from "./utilis/oauth/oauth-and-callback";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "tifejnr",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes Handling Section

app.get("/", async (req, res) => {
  res.render("trelloAdd");
});

app.get("/login", async (req, res) => {
  login(req, res);
});

app.get("/callback", async (req, res) => {
  callback(req, res);
});

app.post("/start", async (req, res) => {
  fetchAllBoards(req, res);
});

app.post("/add", async (req, res) => {
  addMemberToBoard(req, res);
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
