import { useState } from "react";
import AuthNav from "../../AuthNav";
import { useNavigate } from "react-router-dom";
import notificationColorsObj from "../../utils/colors/allColorsObj";
import allIconsContainer from "../../utils/icons/allIconsContainer";
import validatePassword from "../../Auth-Input-Validation/password-validation";

import "../../styles/auth.css";
import resetPasswordRequest from "../../server-requests/resetPasswordRequest";
import allLinks from "../../utils/links/allLinks";
import changeTabTitle from "../../../component-utils/change-tab-title/changeTabTitle";
import pagesTitleConstValues from "../../../component-utils/comp-constant-values/pagesTitleConstValues";

export default function ResetPassword() {
  changeTabTitle(pagesTitleConstValues.resetPassword);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordBorderColor, setPasswordBorderColor] = useState(null);
  const [passwordVisible, setpasswordVisible] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] =
    useState(null);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigateToAnotherRoute = useNavigate();

  const passwordBorderStyle = {
    borderColor:
      passwordBorderColor === null
        ? "grey"
        : passwordBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  const confirmPasswordBorderStyle = {
    borderColor:
      confirmPasswordBorderColor === null
        ? "grey"
        : confirmPasswordBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  const handleShowPassword = () => {
    setpasswordVisible((prevState) => !prevState);
  };

  const handleShowConfirmPassword = () => {
    setConfirmPasswordVisible((prevState) => !prevState);
  };

  async function handleParamsToServer(e) {
    e.preventDefault();

    const url = location.href;

    const userIdRegex = /reset-password\/([^/]+)\//;
    const forgotPassTokenRegex = /\/([^/]+)$/;

    const userIdMatch = url.match(userIdRegex);
    const forgotPassTokenMatch = url.match(forgotPassTokenRegex);

    const userId = userIdMatch ? userIdMatch[1] : null;
    const forgotPassToken = forgotPassTokenMatch
      ? forgotPassTokenMatch[1]
      : null;

    if (confirmPassword !== password) {
      setConfirmPasswordBorderColor(false);
      setPasswordBorderColor(false);
      setPasswordError("Passwords don't match");
      setConfirmPasswordError("Passwords don't match");
      return;
    }

    const passwordValResponse = validatePassword(confirmPassword);

    if (
      typeof passwordValResponse === "object" &&
      "extensionKeyError" in passwordValResponse
    ) {
      setPasswordBorderColor(false);
      setPasswordError(passwordValResponse.extensionKeyError);
      return;
    }

    const paramsToServer = {
      password,
      userId,
      forgotPassToken,
    };

    setConfirmPasswordBorderColor(true);
    setPasswordBorderColor(true);
    setPasswordError("");
    setConfirmPasswordError("");

    const resetPasswordResponse = await resetPasswordRequest(paramsToServer);

    if (resetPasswordResponse.error) {
      setConfirmPasswordBorderColor(false);
      setPasswordBorderColor(false);
      setPasswordError(
        `${resetPasswordResponse.error.error.message}. Restart afresh`
      );
      setConfirmPasswordError(
        `${resetPasswordResponse.error.error.message}. Restart afresh`
      );

      return;
    }

    if (resetPasswordResponse.passwordUpdated) {
      navigateToAnotherRoute(allLinks.homePagePath);
    }
  }

  return (
    <>
      <AuthNav />
      <section className="main-container reset-password-container" id="form">
        <article className="main__title reset-pass-title">
          <h2>Reset your password</h2>
        </article>

        <form
          action=""
          className="reg-form"
          onSubmit={async (e) => {
            await handleParamsToServer(e);
          }}
        >
          <fieldset className="input-wrapper">
            <label htmlFor="passwordId">
              <p>New password</p>
            </label>
            <section className="innerInputWrapper" style={passwordBorderStyle}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter new password"
                id="passwordId"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {passwordVisible ? (
                <picture
                  title="Hide password"
                  onClick={handleShowPassword}
                  className="toggle-password-visisbiilty"
                >
                  <img
                    src={allIconsContainer.hidePasswordEye}
                    alt="hide password icon"
                    width="100"
                    height="100"
                  />
                </picture>
              ) : (
                <picture
                  title="Show password"
                  onClick={handleShowPassword}
                  className="toggle-password-visisbiilty"
                >
                  <img
                    src={allIconsContainer.showPasswordEye}
                    alt="show password icon"
                    width="100"
                    height="100"
                  />
                </picture>
              )}
            </section>
            <p className="error" id="regErrorDisplay">
              {passwordError}
            </p>
          </fieldset>

          <fieldset className="input-wrapper">
            <label htmlFor="passwordIdNew">
              <p>Confirm new password</p>
            </label>
            <section
              className="innerInputWrapper"
              style={confirmPasswordBorderStyle}
            >
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Re-enter new password"
                id="passwordIdNew"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {confirmPasswordVisible ? (
                <picture
                  title="Hide password"
                  onClick={handleShowConfirmPassword}
                  className="toggle-password-visisbiilty"
                >
                  <img
                    src={allIconsContainer.hidePasswordEye}
                    alt="hide password icon"
                    width="100"
                    height="100"
                  />
                </picture>
              ) : (
                <picture
                  title="Show password"
                  onClick={handleShowConfirmPassword}
                  className="toggle-password-visisbiilty"
                >
                  <img
                    src={allIconsContainer.showPasswordEye}
                    alt="show password icon"
                    width="100"
                    height="100"
                  />
                </picture>
              )}
            </section>
            <p className="error" id="regErrorDisplay">
              {confirmPasswordError}
            </p>
          </fieldset>

          <button id="login_btn" className="submit-btn">
            Reset Password
          </button>
        </form>
      </section>
    </>
  );
}
