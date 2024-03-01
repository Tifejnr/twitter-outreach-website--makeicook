import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import notificationColorsObj from "../utils/colors/allColorsObj";
import allIconsContainer from "../utils/icons/allIconsContainer";
import allLinks from "../utils/links/allLinks";
import setCookies from "../../component-utils/cookiesSetting/setCookies";
import validateAll from "../Auth-Input-Validation/validateAll";
import AuthNav from "../AuthNav";
import signUpUserRequest from "../server-requests/signUpUserRequest";
import changeTabTitle from "../../component-utils/change-tab-title/changeTabTitle";
import pagesTitleConstValues from "../../component-utils/comp-constant-values/pagesTitleConstValues";
import linkNavigation from "../../component-utils/link-navigation/linkNaviagtion";

import "../styles/auth.css";

export default function SignUpPage() {
  changeTabTitle(pagesTitleConstValues.signUp);

  const [fullname, setFullname] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [fullnameBorderColor, setFullnameBorderColor] = useState(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailBorderColor, setEmailBorderColor] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordBorderColor, setPasswordBorderColor] = useState(null);
  const [extensionKeyVisible, setextensionKeyVisible] = useState(false);

  const [entryCode, setEntryCode] = useState("");
  const [entryCodeError, setEntryCodeError] = useState("");
  const [entryCodeBorderColor, setEntryCodeBorderColor] = useState(null);

  const navigateToAnotherRoute = useNavigate();

  const fullnameBorderStyle = {
    borderColor:
      fullnameBorderColor === null
        ? "grey"
        : fullnameBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };
  const emailBorderStyle = {
    borderColor:
      emailBorderColor === null
        ? "grey"
        : emailBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  const passwordBorderStyle = {
    borderColor:
      passwordBorderColor === null
        ? "grey"
        : passwordBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  const entryCodeBorderStyle = {
    borderColor:
      entryCodeBorderColor === null
        ? "grey"
        : entryCodeBorderColor
        ? notificationColorsObj.successColor
        : notificationColorsObj.errorColor,
  };

  const handleShowPassword = () => {
    setextensionKeyVisible((prevState) => !prevState);
  };

  const sendInfoToServer = async (e) => {
    e.preventDefault();

    try {
      const paramsObj = {
        fullname,
        email,
        password,
        entryCode,
        isItSignUP: true,
      };

      const validateFunctionResponse = validateAll(paramsObj);
      //validate full name
      if (validateFunctionResponse.fullnameErrorMessage) {
        setFullnameError(validateFunctionResponse.fullnameErrorMessage),
          setFullnameBorderColor(false);
      } else {
        setFullnameError("");
        setFullnameBorderColor(true);
      }
      //valiadte email
      if (validateFunctionResponse.emailValResponse) {
        setEmailError(validateFunctionResponse.emailValResponse),
          setEmailBorderColor(false);
      } else {
        setEmailError("");
        setEmailBorderColor(true);
      }
      //validate password
      if (validateFunctionResponse.extensionKeyValResponse) {
        setPasswordError(validateFunctionResponse.extensionKeyValResponse);
        setPasswordBorderColor(false);
      } else {
        setPasswordError("");
        setPasswordBorderColor(true);
      }

      // validate entry code
      if (validateFunctionResponse.entryCodeErrorMessage) {
        setEntryCodeError(validateFunctionResponse.entryCodeErrorMessage);
        setEntryCodeBorderColor(false);
      } else {
        setEntryCodeError("");
        setEntryCodeBorderColor(true);
      }

      if (
        !validateFunctionResponse.emailValResponse &&
        !validateFunctionResponse.extensionKeyValResponse &&
        !validateFunctionResponse.fullnameErrorMessage
      ) {
        const signUpParam = {
          name: fullname,
          email,
          password,
          entryCode,
        };

        const signedUpResponse = await signUpUserRequest(signUpParam);

        if (signedUpResponse.joiError) {
          setEntryCodeError(signedUpResponse.joiError);
          setPasswordBorderColor(false);
          return;
        }

        if (signedUpResponse.invalidCode) {
          setEntryCodeError(signedUpResponse.invalidCode);
          setEntryCodeBorderColor(false);
          return;
        }

        if (signedUpResponse.alreadyRegistered) {
          setEmailError(signedUpResponse.alreadyRegistered);
          setEmailBorderColor(false);
          return;
        }

        // if (signedUpResponse.errorMessage) {
        //   setPasswordError(signedUpResponse.errorMessage);
        //   setPasswordBorderColor(false);
        //   setEmailBorderColor(false);
        //   return;
        // }

        if (signedUpResponse.token) {
          //save token in chrome local storage for future auto sign in
          setCookies(signedUpResponse.token);
          return navigateToAnotherRoute(allLinks.homePagePath);
        }

        return false;
      }
    } catch (error) {
      console.log(error);
      // console.log(error.message);
    }
  };

  return (
    <>
      <AuthNav />

      <section className="main-container sign-up-cont" id="form">
        <article className="main__title">
          <h2>Sign Up</h2>
        </article>

        <section>
          <form action="" className="reg-form" onSubmit={sendInfoToServer}>
            <fieldset className="input-wrapper">
              <label htmlFor="fullnameId">
                <p>Full name</p>
              </label>

              <section
                className="innerInputWrapper"
                style={fullnameBorderStyle}
              >
                <input
                  type="text"
                  placeholder="Firstname     Lastname"
                  id="fullnameId"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </section>

              <p className="error">{fullnameError}</p>
            </fieldset>
            <fieldset className="input-wrapper">
              <label htmlFor="emailId">
                <p>Email</p>
              </label>

              <section className="innerInputWrapper" style={emailBorderStyle}>
                <input
                  type="email"
                  placeholder="Enter your best email please"
                  id="emailId"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </section>

              <p className="error">{emailError}</p>
            </fieldset>

            <fieldset className="input-wrapper">
              <label htmlFor="extensionKeyId">
                <p>Password</p>
              </label>
              <section
                className="innerInputWrapper"
                style={passwordBorderStyle}
              >
                <input
                  type={extensionKeyVisible ? "text" : "password"}
                  placeholder="minimum of 5 characters"
                  id="extensionKeyId"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {extensionKeyVisible ? (
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
                      alt="Show password icon"
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
              <label htmlFor="entryCodeId">
                <p>Entry code</p>
              </label>

              <section
                className="innerInputWrapper"
                style={entryCodeBorderStyle}
              >
                <input
                  type="text"
                  placeholder="Enter your entry code"
                  id="entryCodeId"
                  value={entryCode}
                  onChange={(e) => setEntryCode(e.target.value)}
                />
              </section>

              <p className="error">{entryCodeError}</p>
            </fieldset>

            <button id="login_btn" className="submit-btn">
              Sign Up
            </button>

            <p className="registering-terms-text">
              By Registering, I agree to Work for Reputation&apos;s
              <span> </span>
              <Link href={allLinks.termsOfServiceLink} target="_blank">
                Terms of Use
              </Link>
              <span> </span>&<span> </span>
              <Link href={allLinks.privacyPolicyLink} target="_blank">
                Privacy Policy
              </Link>
            </p>
          </form>
          <aside className="prompt-message">
            <h3>
              Already have an account?&nbsp;
              <Link
                href={allLinks.loginPagePath}
                onClick={(e) => {
                  e.preventDefault();

                  linkNavigation(allLinks.loginPagePath);
                }}
              >
                <b>Sign in</b>
              </Link>
            </h3>
          </aside>
        </section>
      </section>
    </>
  );
}
