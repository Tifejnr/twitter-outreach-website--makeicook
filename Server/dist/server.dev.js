"use strict";

var express = require("express");

var mongoose = require("mongoose");

var cors = require("cors");

var path = require("path");

var ejs = require("ejs");

var coookieParser = require("cookie-parser");

var app = express(); // functions boards

var _require = require("./utilis/boards/add"),
    addMemberToBoard = _require.addMemberToBoard;

var _require2 = require("./utilis/boards/delete"),
    deleteMemberFromBoard = _require2.deleteMemberFromBoard;

var _require3 = require("./utilis/boards/fetchBoards"),
    fetchAllBoards = _require3.fetchAllBoards;

var _require4 = require("./utilis/boards/getMemberId/idFromUsername"),
    findMemberId = _require4.findMemberId; //functions oauth


var _require5 = require("./utilis/oauth/oauth-and-callback"),
    login = _require5.login;

var _require6 = require("./utilis/oauth/oauth-and-callback"),
    callback = _require6.callback; //functions workspaces


var _require7 = require("./utilis/workspaces/workspacesNames"),
    getWorkspaceName = _require7.getWorkspaceName;

require("dotenv").config();

require("./startup/prod")(app);

var _require8 = require("./envKeys/allKeys"),
    getKeys = _require8.getKeys;

var loginStatusChecker = require("./middlewares/jwt-related/login-status-checker");

var signatureChecker = require("./middlewares/signature/checkSignature");

var userToken = require("./middlewares/token-safety/decryptToken");

var isUserAuthorized = require("./middlewares/jwt-related/authorizedUserVerification"); //webhooks set here so req.body does not get parsed into json before reaching the route. raw body is needed


var webhooks = require("./routes/Payments/webhooks");

app.use("/api/checkout/webhooks", webhooks); //Connect to mong db

var keysObjects = getKeys();
var mongoDB_string = keysObjects.mongoDB_string;
mongoose.connect(mongoDB_string).then(function () {
  console.log("connected to mong db");
})["catch"](function (err) {
  return console.error("could not connect", err);
});
var corsOptions = {
  origin: true,
  //included origin as true
  credentials: true //included credentials as true

};
app.use(cors(corsOptions));
app.use(express.json());
app.use(coookieParser()); //Importing api routes

var registerUser = require("./routes/register-users");

var signInUser = require("./routes/auth");

var paymentsHandling = require("./routes/Payments/checkout");

var dashboard = require("./routes/dashboard");

var forgotPassword = require("./routes/forgot-password"); //api routes declaarations


app.use("/api/register-user", registerUser);
app.use("/api/sign-in", signInUser);
app.use("/api/forgot-password", forgotPassword);
app.use("/api/dashboard", loginStatusChecker, isUserAuthorized, dashboard);
app.use("/api/checkout", loginStatusChecker, paymentsHandling);
app.use("/api/checkout/webhooks", webhooks);
app.use(express["static"](path.join(__dirname, "../../Trello-Project-React/Frontend/dist")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../Trello-Project-React/Frontend/public/views")); //Won't be accessible by React route, callback during app authorization. server owns this route

app.get("/callback", function _callee(req, res) {
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
}); //Won't be accessible by React route, server owns this route

app.get("/cft-icon-64px", function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render("login");

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // Routes Handling Section

app.post("/isloggedIn", loginStatusChecker, function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.json({
            loggedIn: true
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.post("/is-account-authorized", [loginStatusChecker, isUserAuthorized], function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.json({
            authorized: true,
            userCredits: userCredits
          });

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // app.get("/check-cookie", (req, res) => {
//   const tokenCheck = req.cookies.cftAuth;
//   console.log(tokenCheck);
// });

app.post("/authorize", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          login(req, res);

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.post("/start", [loginStatusChecker, isUserAuthorized, userToken], function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          fetchAllBoards(req, res);

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.post("/add", [loginStatusChecker, isUserAuthorized, userToken, signatureChecker], function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          addMemberToBoard(req, res);

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app.post("/find-member-id", [loginStatusChecker, isUserAuthorized, userToken, signatureChecker], function _callee8(req, res) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(findMemberId(req, res));

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  });
});
app.post("/delete-from-boards", [loginStatusChecker, isUserAuthorized, userToken, signatureChecker], function _callee9(req, res) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          deleteMemberFromBoard(req, res);

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
}); //workspaces routes

app.post("/get-workspace-name", [loginStatusChecker, isUserAuthorized, userToken, signatureChecker], function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          getWorkspaceName(req, res);

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
}); //reaeact routes connection

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../Trello-Project-React/Frontend/dist", "index.html"));
});
app.listen(3000, function () {
  console.log("Listening on port 3000");
});
"\nHe is a Gem of a person. Very humble, responsible, quite flexible and cooperative. He does what he commits. We are taking a small break with the project but will not hesitate to reach out again in the near future. \nDon't hesitate in hiring him. Hopefully, we will work again together. \nI wish him all the best for his future\n";