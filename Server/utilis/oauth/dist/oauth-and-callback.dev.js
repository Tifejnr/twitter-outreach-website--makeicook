"use strict";

var session = require("express-session");

var OAuth = require("oauth").OAuth;

var url = require("url");

var _require = require("../../models/users"),
    user = _require.user;

var _require2 = require("../../envKeys/allKeys"),
    getKeys = _require2.getKeys;

var _require3 = require("../../middlewares/token-safety/encryptToken"),
    encryptToken = _require3.encryptToken;

var _require4 = require("./getUserDetails"),
    getUserDetails = _require4.getUserDetails; // OAuth Setup and Functions


var requestURL = "https://trello.com/1/OAuthGetRequestToken";
var accessURL = "https://trello.com/1/OAuthGetAccessToken";
var authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
var appName = "Collab for Trello";
var scope = "read,write";
var expiration = "never";
var keysObj = getKeys();
var key = keysObj.CLIENT_SECRET_KEY;
var secret = keysObj.SECRET;
var loginCallback = "https://www.collabfortrello.com/callback";
var redirectUrl = "https://www.collabfortrello.com/home";
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
              var userDetails, fullName, username, email, accountUserExists, _accountUser, _ref, iv, encrytptedToken, _token, cookieOptions;

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
                      console.log(userDetails);
                      fullName = userDetails.fullName, username = userDetails.username, email = userDetails.email; //check if user has once been authorized with the username

                      _context.prev = 7;
                      _context.next = 10;
                      return regeneratorRuntime.awrap(user.findOne({
                        username: username
                      }));

                    case 10:
                      accountUserExists = _context.sent;

                      if (!accountUserExists) {
                        _context.next = 13;
                        break;
                      }

                      return _context.abrupt("return", res.status(409).json({
                        alreadyRegistered: "User already registered"
                      }));

                    case 13:
                      _accountUser = new user(_.pick(userDetails, ["email"]));
                      _accountUser.credits = 5;
                      _accountUser.name = fullName;
                      _accountUser.username = username; //encrypt and save access token

                      _context.next = 19;
                      return regeneratorRuntime.awrap(encryptToken(accessToken));

                    case 19:
                      _ref = _context.sent;
                      iv = _ref.iv;
                      encrytptedToken = _ref.encrytptedToken;
                      _accountUser.trello_token = encrytptedToken;
                      _accountUser.iv = iv;
                      _accountUser.credits = 5;
                      _context.next = 27;
                      return regeneratorRuntime.awrap(_accountUser.save());

                    case 27:
                      console.log(_accountUser);
                      _context.next = 30;
                      return regeneratorRuntime.awrap(signJwt(_accountUser));

                    case 30:
                      _token = _context.sent;
                      cookieOptions = {
                        maxAge: 1209600000,
                        secure: true,
                        httpOnly: true
                      };
                      res.cookie("cftAuth", _token, cookieOptions).json({
                        registered: true,
                        token: _token
                      });
                      console.log("registered");
                      _context.next = 40;
                      break;

                    case 36:
                      _context.prev = 36;
                      _context.t0 = _context["catch"](7);
                      console.log(_context.t0);
                      return _context.abrupt("return", res.json({
                        error: _context.t0
                      }));

                    case 40:
                      _context.next = 42;
                      return regeneratorRuntime.awrap(accountUser.save());

                    case 42:
                      response.redirect(redirectUrl);

                    case 43:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[7, 36]]);
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