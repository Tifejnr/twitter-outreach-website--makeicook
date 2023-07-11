const session = require("express-session");
const OAuth = require("oauth").OAuth;
const url = require("url");
const { user } = require("../../models/users");
const { getKeys } = require("../../envKeys/allKeys");
const { encryptToken } = require("../../middlewares/token-safety/encryptToken");

// OAuth Setup and Functions
const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
const appName = "Trello OAuth Example";
const scope = "read,write";
const expiration = "never";

const keysObj = getKeys();

const key = keysObj.CLIENT_SECRET_KEY;
const secret = keysObj.SECRET;

const loginCallback = "http://localhost:3000/callback";
const redirectUrl = "http://localhost:5173";

const oauth_secrets = {};

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
    if (error) return console.log(error);
    oauth_secrets[token] = tokenSecret;
    const authorizationUrl = `${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}`;
    res.json({ authorizationUrl });
  });
}

async function callback(req, response) {
  const query = url.parse(req.url, true).query;
  const token = query.oauth_token;
  const tokenSecret = oauth_secrets[token];
  const verifier = query.oauth_verifier;

  oauth.getOAuthAccessToken(
    token,
    tokenSecret,
    verifier,
    function (error, accessToken, accessTokenSecret, results) {
      oauth.getProtectedResource(
        "https://api.trello.com/1/members/me/boards",
        "GET",
        accessToken,
        accessTokenSecret,
        async function (error, data, response2) {
          if (error) return console.log(error);
          const accountUser = await user.findById(req.user._id);
          accountUser.trello_token = await encryptToken(accessToken);
          console.log(accountUser);
          console.log("data Gotten");

          response.redirect(redirectUrl);
        }
      );
    }
  );
}

exports.callback = callback;
exports.login = login;
