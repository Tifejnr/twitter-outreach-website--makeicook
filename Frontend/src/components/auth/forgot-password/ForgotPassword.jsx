"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthNav from "../AuthNav";
import notificationColorsObj from "../utils/colors/allColorsObj";
import "../styles/auth.css";
import forgotPasswordRequest from "../server-requests/forgotPasswordRequest";
import forgotPasswordEmailVal from "../Auth-Input-Validation/forgot-password-email-val/forgotPasswordEmailVal";
import allLinks from "../utils/links/allLinks";
import setuserIdCookie from "../../component-utils/cookiesSetting/userId/setuserIdCookie";
import setForgotPassCookie from "../../component-utils/cookiesSetting/forgot-pass-token/setForgotPassCookie";
import changeTabTitle from "../../component-utils/change-tab-title/changeTabTitle";
import pagesTitleConstValues from "../../component-utils/comp-constant-values/pagesTitleConstValues";

export default function ForgotPassword() {
  changeTabTitle(pagesTitleConstValues.forgotPassword);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailBorderColor, setEmailBorderColor] = useState(null);

  const navigateToAnotherRoute = useNavigate();

  const emailBorderStyle = {
    borderColor:
      emailBorderColor === null
        ? "grey"
        : emailBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  async function handleSubmitBtn(e) {
    e.preventDefault();
    const isValidationFaulty = forgotPasswordEmailVal(email);

    if (isValidationFaulty.emailErrorMessage) {
      setEmailError(isValidationFaulty.emailErrorMessage);
      setEmailBorderColor(false);

      return;
    } else {
      setEmailError("");
      setEmailBorderColor(true);
    }

    const responseFromServer = await forgotPasswordRequest(email);

    if (responseFromServer.emailError) {
      setEmailError(responseFromServer.emailError);
      setEmailBorderColor(false);

      return;
    }

    if (responseFromServer.emailSent) {
      const { emailSent } = responseFromServer;
      const { userId, forgotPassToken } = emailSent;

      if (!userId || !forgotPassToken) {
        setEmailError("Internal error occured, please retry");
        setEmailBorderColor(false);
        return;
      }

      setuserIdCookie(userId);
      setForgotPassCookie(forgotPassToken);

      return navigateToAnotherRoute(allLinks.emailSentPage);
    }
  }

  return (
    <>
      <AuthNav />
      <section className="main-container forgot-password-container" id="form">
        <article className="main__title">
          <h2>Forgotten Password</h2>
        </article>

        <article className="forgot-pass-info">
          <h3>Reset your password by providing your account email below.</h3>
        </article>

        <form action="" className="reg-form">
          <fieldset className="input-wrapper">
            <label htmlFor="emailId">
              <p>Email</p>
            </label>

            <section className="innerInputWrapper" style={emailBorderStyle}>
              <input
                type="email"
                placeholder="Enter your email"
                id="emailId"
                autoFocus={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>

            <p className="error">{emailError}</p>
          </fieldset>

          <button
            id="login_btn"
            className="submit-btn"
            onClick={handleSubmitBtn}
          >
            Continue
          </button>
        </form>
      </section>
    </>
  );
}
