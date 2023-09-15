"use strict";

var session = require("express-session");

var OAuth = require("oauth").OAuth;

var url = require("url");

var _require = require("../../models/users"),
    user = _require.user;

var _ = require("lodash");

var _require2 = require("../../envKeys/allKeys"),
    getKeys = _require2.getKeys;

var _require3 = require("../../middlewares/token-safety/encryptToken"),
    encryptToken = _require3.encryptToken;

var _require4 = require("./getUserDetails"),
    getUserDetails = _require4.getUserDetails;

var _require5 = require("../../middlewares/jwt-related/sign-jwt"),
    signJwt = _require5.signJwt; // OAuth Setup and Functions


var requestURL = "https://trello.com/1/OAuthGetRequestToken";
var accessURL = "https://trello.com/1/OAuthGetAccessToken";
var authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
var appName = "Collab for Trello"; //important to put account in the scope so that you can get the email of user

var scope = "read,write,account";
var expiration = "never";
var keysObj = getKeys();
var key = keysObj.CLIENT_SECRET_KEY;
var secret = keysObj.SECRET; // const loginCallback = "http://localhost:3000/callback";
// const homeUrl = "http://localhost:5173/home";

var loginCallback = "https://www.collabfortrello.com/callback";
var homeUrl = "https://www.collabfortrello.com/home";
var cookieOptions = {
  maxAge: 1209600000,
  secure: true,
  httpOnly: false
};
var oauth_secrets = {}; //trello oauth starts

var oauth = new OAuth(requestURL, accessURL, key, secret, "1.0A", loginCallback, "HMAC-SHA1");

function login(req, res) {
  oauth.getOAuthRequestToken(function (error, token, tokenSecret, results) {
    if (error) return console.log(error);
    oauth_secrets[token] = tokenSecret;
    var authorizationUrl = "".concat(authorizeURL, "?oauth_token=").concat(token, "&name=").concat(appName, "&scope=").concat(scope, "&expiration=").concat(expiration);
    res.json({
      authorizationUrl: authorizationUrl
    });
  });
}

function callback(req, response) {
  var query, token, tokenSecret, verifier;
  return regeneratorRuntime.async(function callback$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = url.parse(req.url, true).query;
          token = query.oauth_token;
          tokenSecret = oauth_secrets[token];
          verifier = query.oauth_verifier;
          oauth.getOAuthAccessToken(token, tokenSecret, verifier, function (error, accessToken, accessTokenSecret, results) {
            oauth.getProtectedResource("https://api.trello.com/1/members/me/boards", "GET", accessToken, accessTokenSecret, function _callee(error, data, response2) {
              var userDetails, fullName, username, accountUserExists, _token2, accountUser, _ref, iv, encrytptedToken, _token;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!error) {
                        _context.next = 2;
                        break;
                      }

                      return _context.abrupt("return", console.log(error));

                    case 2:
                      _context.next = 4;
                      return regeneratorRuntime.awrap(getUserDetails(key, accessToken));

                    case 4:
                      userDetails = _context.sent;
                      fullName = userDetails.fullName, username = userDetails.username; //check if user has once been authorized/registered with the username

                      _context.prev = 6;
                      _context.next = 9;
                      return regeneratorRuntime.awrap(user.findOne({
                        username: username
                      }));

                    case 9:
                      accountUserExists = _context.sent;

                      if (!accountUserExists) {
                        _context.next = 15;
                        break;
                      }

                      _context.next = 13;
                      return regeneratorRuntime.awrap(signJwt(accountUserExists));

                    case 13:
                      _token2 = _context.sent;
                      return _context.abrupt("return", response.cookie("cftAuth", _token2, cookieOptions).redirect(homeUrl));

                    case 15:
                      //create new user and save user details in db
                      accountUser = new user(_.pick(userDetails, ["email"]));
                      accountUser.name = fullName;
                      accountUser.username = username; //encrypt and save access token plus give 5 bonus credits for trial

                      _context.next = 20;
                      return regeneratorRuntime.awrap(encryptToken(accessToken));

                    case 20:
                      _ref = _context.sent;
                      iv = _ref.iv;
                      encrytptedToken = _ref.encrytptedToken;
                      accountUser.trello_token = encrytptedToken;
                      accountUser.iv = iv;
                      accountUser.credits = 5;
                      _context.next = 28;
                      return regeneratorRuntime.awrap(accountUser.save());

                    case 28:
                      console.log(accountUser);
                      _context.next = 31;
                      return regeneratorRuntime.awrap(signJwt(accountUser));

                    case 31:
                      _token = _context.sent;
                      console.log("registered");
                      return _context.abrupt("return", response.cookie("cftAuth", _token, cookieOptions).redirect(homeUrl));

                    case 36:
                      _context.prev = 36;
                      _context.t0 = _context["catch"](6);
                      console.log(_context.t0);
                      return _context.abrupt("return", response.json({
                        error: _context.t0
                      }));

                    case 40:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[6, 36]]);
            });
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

exports.callback = callback;
exports.login = login;