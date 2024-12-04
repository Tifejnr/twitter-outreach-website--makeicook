const websiteUrl = "https://makeicook.com";
// const websiteUrl = "http://localhost:3000";
const loginPagePath = "/sign-in";
const signUpPage = "/sign-up";
const homePagePath = "/";
const lamStudHomePage = "/homepage";
const privacyPolicyLink = "https://makeicook.com/privacy-policy";
const termsOfServiceLink = "https://makeicook.com/terms-of-service";
const forgotPasswordLink = "https://makeicook.com/forgot-password";
const userDashboardLink = "/userDashboard";
// const apiRouteSignIn = `${websiteUrl}/api/sign-in`;
const apiRouteSignIn = `${websiteUrl}/api/auth`;
const apiRouteSignUp = `${websiteUrl}/api/users`;
const isUserAuthorizedRoute = `${websiteUrl}/is-account-authorized`;
const forgotPasswordPage = "/forgot-password";
const forgotPasswordAPIRoute = `${websiteUrl}/api/forgot-password`;
const resetPasswordAPIRoute = `${websiteUrl}/api/forgot-password/reset-password`;
const contactUsAPIRoute = `${websiteUrl}/api/contact-us`;
const tutorialsObjArrayFromServerRoute = `${websiteUrl}/api/get-tutorials`;
const emailSentPage = "/email-sent";
const extensionChromeStoreLink = `https://chromewebstore.google.com/detail/twitter-x-outreach-extens/dngpbgapdaebamnpbjikicbjchejbgle`;
const youtubeAccountLink = "https://www.youtube.com/@MakeICooktool";
const twitterAccountLink = "https://x.com/makeICook";

const allLinks = {
  tutorialsObjArrayFromServerRoute,
  twitterAccountLink,
  youtubeAccountLink,
  websiteUrl,
  loginPagePath,
  signUpPage,
  homePagePath,
  privacyPolicyLink,
  termsOfServiceLink,
  forgotPasswordLink,
  userDashboardLink,
  apiRouteSignIn,
  apiRouteSignUp,
  forgotPasswordPage,
  forgotPasswordAPIRoute,
  emailSentPage,
  extensionChromeStoreLink,
  isUserAuthorizedRoute,
  lamStudHomePage,
  resetPasswordAPIRoute,
  contactUsAPIRoute,
};

export default allLinks;
