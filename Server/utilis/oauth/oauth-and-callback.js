const session = require("express-session");
const OAuth = require("oauth").OAuth;

// OAuth Setup and Functions
const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
const appName = "Trello OAuth Example";
const scope = "read,write";
const expiration = "never";

const key = "3871b737b5e006da43d0e48f6d8f68ee";
const secret =
  "c659358a2cb9ba2a8db04844b480df9058f0806c95f941b2f02b323501488d9c";

const loginCallback = "http://localhost:3000/callback";
const oauth = new OAuth(
  requestURL,
  accessURL,
  key,
  secret,
  "1.0A",
  loginCallback,
  "HMAC-SHA1"
);

function login(req, res) {
  oauth.getOAuthRequestToken(function (error, token, tokenSecret, results) {
    req.session.oauth_secret = tokenSecret;
    res.redirect(
      `${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}&token=${token}&token_secret=${tokenSecret}`
    );
  });
}

async function callback(req, response) {
  let { oauth_token, oauth_verifier } = req.query;
  let oauth_secret = req.session.oauth_secret;

  oauth.getOAuthAccessToken(
    oauth_token,
    oauth_secret,
    oauth_verifier,
    function (error, accessToken, accessTokenSecret, results) {
      oauth.getProtectedResource(
        "https://api.trello.com/1/members/me/boards",
        "GET",
        accessToken,
        accessTokenSecret,
        function (error, data, response2) {
          if (error) {
            console.log(error);
            response.send(error);
          } else {
            console.log("data Gotten");
            response.cookie("acesk", accessToken, {
              maxAge: 1209600000,
              httpOnly: true,
              secure: true,
            });
            response.cookie("acesec", accessTokenSecret, {
              maxAge: 1209600000,
              httpOnly: true,
              secure: true,
            });
            response.redirect("/");
          }
        }
      );
    }
  );
}

exports.callback = callback;
exports.login = login;
