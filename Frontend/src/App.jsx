import "./contact-us.css";
import "./landing-page.css";

import { Route, Routes } from "react-router-dom";
// import ReactGA from "react-ga4";
// import Register from "./compnents/Auth/Register/Register";
import SignInPage from "./components/auth/sign-in/SignInPage";
import SignUpPage from "./components/auth/sign-up/SignUpPage";
import ForgotPassword from "./components/auth/forgot-password/ForgotPassword";
import ResetPassword from "./components/auth/forgot-password/reset-password/ResetPassword";
import EmailSentView from "./components/auth/forgot-password/email-sent-view/EmailSentView";
import LandingPage from "./components/LandingPage/LandingPage";
import MainContactPage from "./components/Pages/Contact-us-page/MainContactPage";
import AboutUsPage from "./components/Pages/About-us-page/AboutUs";
import TermsOfUsePage from "./components/Pages/Terms-and-privacy/TermsOfUsePage";
import PrivacyPolicyPage from "./components/Pages/Terms-and-privacy/privacyPolicy";
import PaymentCallbackUrlPage from "./components/Pages/call-back-url-page/PaymentCallbackUrlPage";
import TutorialsPage from "./components/Pages/Tutorials/Tutorials";
import Pricing from "./components/Pages/Pricing";
// import OauthPage from "./compnents/Trello-oauth-page/OauthPage";
// import LandingPage from "./compnents/LandingPage/LandingPage";
// import HomePage from "./compnents/Home-nav-items/HomePage";
// import Dashboard from "./compnents/Auth/Dashboard/Dashboard";
// import MainContactPage from "./compnents/Pages/Contact-us-page/MainContactPage";
// import AboutUsPage from "./compnents/Pages/About-us-page/AboutUs";
// import TermsOfUsePage from "./compnents/Pages/Terms-and-privacy/TermsOfUsePage";
// import PrivacyPolicyPage from "./compnents/Pages/Terms-and-privacy/privacyPolicy";
// import MainForgotPasswordPage from "./compnents/Pages/ForgotPassword/MainForgotPasswordPage";
// import ResetPasswordPage from "./compnents/Pages/ForgotPassword/ResetPassword/ResetPasswordPage";
// import OnlyAuthorizedUsersHomeMain from "./components/controller/OnlyAuthorizedUsersHomeMain";

// const trackingId = "G-67WKHKMDEH";

// ReactGA.initialize(trackingId);

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route
          path="/home-main"
          element={
            <OnlyAuthorizedUsersHomeMain>
              <HomepageLamz />
            </OnlyAuthorizedUsersHomeMain>
          }
        /> */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/*" element={<ResetPassword />} />
        <Route path="/email-sent" element={<EmailSentView />} />
        {/* <Route
          path="/dashboard"
          element={
            <OnlyAuthorizedUsers>
              <Dashboard />
            </OnlyAuthorizedUsers>
          }
        /> */}

        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact-us" element={<MainContactPage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/terms-of-service" element={<TermsOfUsePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/verify-payment" element={<PaymentCallbackUrlPage />} />
      </Routes>
    </>
  );
}

export default App;
