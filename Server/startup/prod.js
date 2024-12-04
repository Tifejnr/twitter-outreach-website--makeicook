import helmet from "helmet";
import compression from "compression";

const setupMiddleware = (app) => {
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        // defaultSrc: ["'self'"],
        // connectSrc: [
        //   "'self'",
        //   "https://www.makeicook.com",
        //   "chrome-extension://chpmkkhcpfhjdkkeiggiicfejnkhcidb",
        //   "https://www.google-analytics.com",
        //   "https://www.youtube.com",
        //   "https://i.ibb.co",
        // ],
        scriptSrc: [
          "'self'",
          "https://www.googletagmanager.com",
          "'unsafe-inline'",
        ],
        frameSrc: ["'self'", "https://www.youtube.com"],
        imgSrc: [
          "'self'",
          "data:", // Allow inline images or data URIs
          "https://i.ibb.co", // Allow external images from i.ibb.co
        ],
      },
    })
  );
  app.use(compression());
};

export default setupMiddleware;
