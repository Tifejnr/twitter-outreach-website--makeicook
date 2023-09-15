const session = require("express-session");
const OAuth = require("oauth").OAuth;
const url = require("url");
const { user } = require("../../models/users");
const _ = require("lodash");
const { getKeys } = require("../../envKeys/allKeys");
const { encryptToken } = require("../../middlewares/token-safety/encryptToken");
const { getUserDetails } = require("./getUserDetails");
const { signJwt } = require("../../middlewares/jwt-related/sign-jwt");

// OAuth Setup and Functions
const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
const appName = "Collab for Trello";

//important to put account in the scope so that you can get the email of user
const scope = "read,write,account";
const expiration = "never";

const keysObj = getKeys();

const key = keysObj.CLIENT_SECRET_KEY;
const secret = keysObj.SECRET;

const loginCallback = "http://localhost:3000/callback";
const redirectUrl = "http://localhost:5173/home";

// const loginCallback = "https://www.collabfortrello.com/callback";
// const redirectUrl = "https://www.collabfortrello.com/home";

const oauth_secrets = {};

//trello oauth starts
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

          //Get user details from trello and save his email, name, username and token
          const userDetails = await getUserDetails(key, accessToken);

          console.log(userDetails);
          const { fullName, username, email } = userDetails;
          //check if user has once been authorized with the username
          try {
            const accountUserExists = await user.findOne({
              username: username,
            });

            if (accountUserExists)
              return response
                .status(409)
                .json({ alreadyRegistered: "User already registered" });

            const accountUser = new user(_.pick(userDetails, ["email"]));
            accountUser.credits = 5;
            accountUser.name = fullName;
            accountUser.username = username;

            //encrypt and save access token plus give 5 bonus credits for trial
            const { iv, encrytptedToken } = await encryptToken(accessToken);
            accountUser.trello_token = encrytptedToken;
            accountUser.iv = iv;
            accountUser.credits = 5;

            await accountUser.save();

            console.log(accountUser);

            const token = await signJwt(accountUser);

            const cookieOptions = {
              maxAge: 1209600000,
              secure: true,
              httpOnly: false,
            };

            response
              .cookie("cftAuth", token, cookieOptions)
              .redirect(redirectUrl);

            console.log("registered");
          } catch (error) {
            console.log(error);
            return response.json({ error });
          }
        }
      );
    }
  );
}

exports.callback = callback;
exports.login = login;
