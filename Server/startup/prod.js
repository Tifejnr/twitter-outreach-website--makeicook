import helmet from "helmet";
import compression from "compression";

const setupMiddleware = (app) => {
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "https://www.workforreputation.com",
          "chrome-extension://chpmkkhcpfhjdkkeiggiicfejnkhcidb",
          "https://www.google-analytics.com",
          "https://www.youtube.com",
        ],
        scriptSrc: [
          "'self'",
          "https://www.googletagmanager.com",
          "'unsafe-inline'",
        ],
        frameSrc: ["'self'", "https://www.youtube.com"],
      },
    })
  );
  app.use(compression());
};

export default setupMiddleware;
