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
var appName = "Trello OAuth Example";
var scope = "read,write";
var expiration = "never";
var keysObj = getKeys();
var key = keysObj.CLIENT_SECRET_KEY;
var secret = keysObj.SECRET;
var loginCallback = "https://www.collabfortrello.com/callback";
var redirectUrl = "https://www.collabfortrello.com/home";
var oauth_secrets = {};
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
              var accountUser, _ref, iv, encrytptedToken, userDetails, fullName, username;

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
                      return regeneratorRuntime.awrap(user.findById(req.user._id));

                    case 4:
                      accountUser = _context.sent;
                      _context.next = 7;
                      return regeneratorRuntime.awrap(encryptToken(accessToken));

                    case 7:
                      _ref = _context.sent;
                      iv = _ref.iv;
                      encrytptedToken = _ref.encrytptedToken;
                      accountUser.trello_token = encrytptedToken;
                      accountUser.iv = iv; //save user name and username

                      _context.next = 14;
                      return regeneratorRuntime.awrap(getUserDetails(key, accessToken));

                    case 14:
                      userDetails = _context.sent;
                      fullName = userDetails.fullName, username = userDetails.username;
                      accountUser.name = fullName;
                      accountUser.username = username;
                      _context.next = 20;
                      return regeneratorRuntime.awrap(accountUser.save());

                    case 20:
                      response.redirect(redirectUrl);

                    case 21:
                    case "end":
                      return _context.stop();
                  }
                }
              });
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