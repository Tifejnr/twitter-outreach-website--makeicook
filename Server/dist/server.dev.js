"use strict";

var express = require("express");

var mongoose = require("mongoose");

var cors = require("cors");

var path = require("path");

var ejs = require("ejs");

var coookieParser = require("cookie-parser");

var app = express();

var session = require("express-session");

var _require = require("./utilis/boards/add"),
    addMemberToBoard = _require.addMemberToBoard;

var _require2 = require("./utilis/boards/fetchBoards"),
    fetchAllBoards = _require2.fetchAllBoards;

var _require3 = require("./utilis/oauth/oauth-and-callback"),
    login = _require3.login;

var _require4 = require("./utilis/oauth/oauth-and-callback"),
    callback = _require4.callback;

var _require5 = require("./utilis/boards/delete"),
    deleteMemberFromBoard = _require5.deleteMemberFromBoard;

var _require6 = require("./envKeys/allKeys"),
    getKeys = _require6.getKeys;

var loginStatusChecker = require("./middlewares/jwt-related/login-status-checker");

var signatureChecker = require("./middlewares/signature/checkSignature");

var userToken = require("./middlewares/token-safety/decryptToken");

var isUserAuthorized = require("./middlewares/jwt-related/authorizedUserVerification");

require("dotenv").config();

require("./startup/prod")(app); //webhooks set here so req.body does not get parsed into json before reaching the route. raw body is needed


var webhooks = require("./routes/Payments/webhooks");

app.use("/api/checkout/webhooks", webhooks); //Connect to mong db

var keysObjects = getKeys();
var mongoDB_string = keysObjects.mongoDB_string;
mongoose.connect(mongoDB_string).then(function () {
  console.log("connected to mong db");
})["catch"](function (err) {
  return console.error("could not connect", err);
});
app.use(cors());
app.use(express.json());
app.use(coookieParser()); //Importing api routes

var registerUser = require("./routes/register-users");

var signInUser = require("./routes/auth");

var paymentsHandling = require("./routes/Payments/checkout");

var dashboard = require("./routes/dashboard"); //api routes declaarations


app.use("/api/register-user", registerUser);
app.use("/api/sign-in", signInUser);
app.use("/api/dashboard", loginStatusChecker, isUserAuthorized, dashboard);
app.use("/api/checkout", loginStatusChecker, paymentsHandling);
app.use("/api/checkout/webhooks", webhooks);
app.use(express["static"](path.join(__dirname, "../../Trello-Project-React/Frontend/dist"))); //Won't be accessible by React route, server owns this route

app.get("/callback", loginStatusChecker, function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          callback(req, res);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../Trello-Project-React/Frontend/dist", "index.html"));
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../Trello-Project-React/Frontend/views")); // Routes Handling Section

app.post("/isloggedIn", loginStatusChecker, function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.json({
            loggedIn: true
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.post("/is-account-authorized", [loginStatusChecker, isUserAuthorized], function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.json({
            authorized: true,
            userCredits: userCredits
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.post("/authorize", loginStatusChecker, function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          login(req, res);

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.post("/start", [loginStatusChecker, isUserAuthorized, userToken], function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          fetchAllBoards(req, res);

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.post("/add", [loginStatusChecker, isUserAuthorized, userToken, signatureChecker], function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          addMemberToBoard(req, res);

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.post("/delete", [loginStatusChecker, isUserAuthorized, userToken, signatureChecker], function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          deleteMemberFromBoard(req, res);

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app.listen(3000, function () {
  console.log("Listening on port 3000");
});