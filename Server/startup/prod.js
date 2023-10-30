const helmet = require("helmet");
const compression = require("compression");

module.exports = function (app) {
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "https://www.collabfortrello.com",
          "https://www.googletagmanager.com",
          "https://www.youtube.com",
        ],

        scriptSrc: ["'self'", "'unsafe-inline'"],

        frameSrc: ["'self'", "https://www.youtube.com"],
      },
    })
  );
  app.use(compression());
};
